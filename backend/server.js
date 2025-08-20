'use strict';
require('dotenv').config(); // za pohranu osjetljivih podataka u .env
const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // sigurnosni headeri
const rateLimit = require('express-rate-limit'); // limitiranje zahtjeva
const { MongoClient, ServerApiVersion } = require('mongodb');
const xss = require('xss'); // za sanitizaciju inputa
const validator = require('validator'); // validacija emaila

const app = express();

const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'prod' 
  ? '.env.prod' 
  : '.env.dev';

dotenv.config({ path: envFile });

const PORT = process.env.PORT || 3001;

// ----- SECURITY MIDDLEWARES -----
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*', // ograniči na tvoju frontend domenu
}));
app.use(express.json({ limit: '10kb' })); // limitiraj veličinu tijela zahtjeva

// Rate limiter: max 100 zahtjeva po 15 minuta po IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Previše zahtjeva, pokušajte kasnije.',
});
app.use(limiter);

// ----- MONGO DB -----
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

let submissionsCollection;

async function initMongo() {
  try {
    await client.connect();
    const db = client.db('baltazar-anketa');
    submissionsCollection = db.collection('submissions');
    console.log('MongoDB spojen i kolekcija spremna');
  } catch (err) {
    console.error('Greška pri spajanju na MongoDB:', err);
    process.exit(1); // prekini server ako ne može spojiti DB
  }
}
initMongo();

// ----- TEST ROUTE -----
app.get('/', (req, res) => res.send('Backend radi'));

// ----- POST /api/submit -----
app.post('/api/submit', async (req, res) => {
  try {
    let { name, email, consent } = req.body;

    // Sanitizacija inputa
    name = xss(name?.trim());
    email = xss(email?.trim());

    // Validacija
    if (!name || !email || consent !== true) {
      return res.status(400).json({ error: 'Nedostaju podaci ili nije dano dopuštenje' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Neispravan email' });
    }

    const submission = {
      name,
      email,
      consent,
      timestamp: new Date(),
      ip: req.ip, // pohrana IP adrese
    };

    // Spremanje u MongoDB
    await submissionsCollection.insertOne(submission);

    res.json({ message: 'Podaci su spremljeni' });
  } catch (error) {
    console.error('Greška na serveru:', error);
    res.status(500).json({ error: 'Došlo je do greške na serveru.' });
  }
});

// ----- START SERVER -----
app.listen(PORT, () => console.log(`Server radi na portu ${PORT}`));
