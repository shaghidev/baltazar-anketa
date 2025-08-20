// server.js
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config(); // učitaj .env

const app = express();

// 🟢 Provjera MONGO_URI
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ MONGO_URI nije postavljen u .env fajlu!");
  process.exit(1); // prekini server ako nema URI
}

// 🟢 Trust proxy za Render i X-Forwarded-For
app.set('trust proxy', 1);

// 🟢 Middleware
app.use(express.json());
app.use(helmet());

// 🟢 CORS - koristi ALLOWED_ORIGIN iz env
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
  credentials: true,
}));

// 🟢 Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuta
  max: 100, // max 100 requests po IP
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// 🟢 MongoDB connect
mongoose.connect(mongoUri)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Greška pri spajanju na MongoDB:', err));

// 🟢 Schema i model (primjer)
const submissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  consent: Boolean,
}, { timestamps: true });

const Submission = mongoose.model('Submission', submissionSchema);

// 🟢 Primjer API endpointa
app.post('/api/submit', async (req, res) => {
  const { name, email, consent } = req.body;
  try {
    console.log('Primljeni podaci:', { name, email, consent });

    const newSubmission = new Submission({ name, email, consent });
    await newSubmission.save();

    res.json({ success: true, message: 'Podaci spremljeni u MongoDB!' });
  } catch (err) {
    console.error('❌ Greška pri spremanju:', err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
});

// 🟢 Test endpoint
app.get('/', (req, res) => {
  res.send('🚀 API radi! Probaj POST /api/submit');
});

// 🟢 Start servera
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
});
