import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import diplomaRouter from './routes/sendDiploma.js'; 
import User from './models/User.js'; 

dotenv.config();

const app = express();

// ⚡ Povjerenje proxyju da se X-Forwarded-For koristi ispravno
app.set("trust proxy", 1);

app.use(cors());
app.use(bodyParser.json());

// ✅ Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuta
  max: 100, // max 100 requesta po IP-u
  standardHeaders: true, // vraća rate-limit info u Response headers
  legacyHeaders: false,   // isključuje X-RateLimit-* header
});
app.use(limiter);

// Mongo connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Spojeno na MongoDB'))
  .catch(err => console.error('❌ Greška pri spajanju na MongoDB:', err));

// ✅ Router za slanje diplome
app.use('/api/send-diploma', diplomaRouter);

// 👇 Ruta za spremanje korisnika
app.post('/api/submit', async (req, res) => {
  const { name, email, consent } = req.body;
  try {
    const newUser = new User({ name, email, consent });
    await newUser.save();
    res.json({ success: true, message: 'Podaci spremljeni u bazu!' });
  } catch (err) {
    console.error('Greška:', err);
    res.status(500).json({ error: 'Greška pri spremanju podataka' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server radi na portu ${PORT}`));

app.listen(PORT, () => {
  console.log(`🚀 Server radi na portu ${PORT}`);

  // ======================
  // AUTO-PING BACKENDA
  // ======================
  const PING_INTERVAL = 14 * 60 * 1000; // 14 minuta
  const SERVER_URL = process.env.SERVER_URL || `http://localhost:${PORT}`;

  // GET /api/ping rutu već možeš imati ili napraviti
  app.get('/api/ping', (req, res) => res.json({ status: 'ok', time: new Date() }));

  const pingServer = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/api/ping`);
      console.log('Ping poslan serveru, status:', res.status);
    } catch (err) {
      console.error('Greška pri pinganju servera:', err);
    }
  };

  pingServer(); // odmah ping na startu
  setInterval(pingServer, PING_INTERVAL);
});
