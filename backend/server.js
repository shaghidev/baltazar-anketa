import express from 'express';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import sendDiplomaRouter from './routes/sendDiploma.js';
dotenv.config();

const app = express();

// 🟢 Middleware
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*', credentials: true }));

// 🟢 Rate limiter
const limiter = rateLimit({ windowMs: 15*60*1000, max: 100 });
app.use(limiter);

// 🟢 MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// 🟢 Routes
app.use('/api/send-diploma', sendDiplomaRouter);

app.post('/api/submit', async (req, res) => {
  const { name, email, consent } = req.body;
  try {
    // Ovdje možeš spremiti podatke u MongoDB
    res.json({ success: true, message: 'Podaci spremljeni!' });
  } catch (err) {
    res.status(500).json({ error: 'Greška na serveru' });
  }
});

// 🟢 Test
app.get('/', (req, res) => res.send('API radi 🚀'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server radi na portu ${PORT}`));
