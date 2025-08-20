import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

const app = express();

// 🟢 Trust proxy za Render i X-Forwarded-For
app.set('trust proxy', 1);

// 🟢 Middleware
app.use(express.json());
app.use(helmet());

// 🟢 CORS - koristi ALLOWED_ORIGIN iz env
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,
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
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Greška pri spajanju na MongoDB:', err));

// 🟢 Primjer API endpointa
app.post('/api/submit', async (req, res) => {
  const { name, email, consent } = req.body;
  try {
    // Tu ide logika spremanja u bazu
    console.log('Primljeni podaci:', { name, email, consent });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
});

// 🟢 Start servera
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
});
