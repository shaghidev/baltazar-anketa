// ======================
// 📌 Importi
// ======================
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

// ======================
// 📌 Middleware
// ======================
app.set("trust proxy", 1); // koristi X-Forwarded-For kod deploya

// CORS
const allowedOrigin = process.env.ALLOWED_ORIGIN || '';
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin === allowedOrigin) {
      callback(null, true);
    } else {
      console.warn(`❌ Origin ${origin} nije dozvoljen`);
      callback(new Error(`Origin ${origin} nije dozvoljen`));
    }
  }
}));

app.use(bodyParser.json());

// Rate limiter
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
}));

// ======================
// 📌 MongoDB
// ======================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Spojeno na MongoDB'))
  .catch(err => console.error('❌ Greška pri spajanju na MongoDB:', err));

// ======================
// 📌 Rute
// ======================

// Slanje diploma
app.use('/api/send-diploma', diplomaRouter);

// Dodavanje ili update korisnika
app.post('/api/submit', async (req, res) => {
  const { name, email, consent } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email je obavezan' });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email }, // pretraga po emailu
      { $set: { name, email, consent } }, // update ili insert
      { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    );

    res.json({ success: true, message: '✅ Podaci spremljeni/updated!', user: updatedUser });
  } catch (err) {
    console.error('❌ Greška pri spremanju korisnika:', err);
    res.status(500).json({ error: 'Greška pri spremanju ili updateu podataka' });
  }
});

// Ping ruta (keepalive)
app.get('/api/ping', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// ======================
// 📌 Pokretanje servera
// ======================
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server radi na portu ${PORT}`);

  // Keepalive ping
  const PING_INTERVAL = 10 * 60 * 1000; // 14 minuta
  const SERVER_URL = process.env.SERVER_URL || `http://localhost:${PORT}`;

  const pingServer = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/api/ping`);
      console.log('📡 Ping servera, status:', res.status);
    } catch (err) {
      console.error('❌ Greška pri pinganju servera:', err);
    }
  };

  pingServer(); // odmah na startu
  setInterval(pingServer, PING_INTERVAL);
});
