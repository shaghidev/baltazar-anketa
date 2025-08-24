import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const app = express();

// 👇 prvo napravi app, pa tek onda trust proxy
app.set("trust proxy", 1); // Render/Vercel/Heroku koriste proxyje

app.use(cors());
app.use(bodyParser.json());

// Povezivanje na MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Spojeno na MongoDB'))
  .catch(err => console.error('❌ Greška pri spajanju na MongoDB:', err));

// Ruta za spremanje korisnika
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
