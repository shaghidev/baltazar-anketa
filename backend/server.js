const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors()); // dopušta sve domene

app.use(express.json());

const submissionsPath = path.join(__dirname, 'submissions.json');

// Ako fajl ne postoji ili je prazan, inicijaliziraj praznim nizom
if (!fs.existsSync(submissionsPath) || fs.readFileSync(submissionsPath, 'utf-8').trim() === '') {
  fs.writeFileSync(submissionsPath, JSON.stringify([]));
}

// Test ruta
app.get('/', (req, res) => res.send('Backend radi'));

// Ruta za primanje podataka
app.post('/api/submit', (req, res) => {
  try {
    const { name, email, consent } = req.body;

    if (!name || !email || consent !== true) {
      return res.status(400).json({ error: 'Nedostaju podaci ili nije dano dopuštenje' });
    }

    let submissions = [];
    try {
      const content = fs.readFileSync(submissionsPath, 'utf-8');
      submissions = content ? JSON.parse(content) : [];
    } catch (err) {
      console.error('Greška pri čitanju submissions.json, koristim prazan niz.', err);
      submissions = [];
    }

    submissions.push({ name, email, consent, timestamp: new Date().toISOString() });

    try {
      fs.writeFileSync(submissionsPath, JSON.stringify(submissions, null, 2));
    } catch (err) {
      console.error('Greška pri zapisivanju submissions.json:', err);
      return res.status(500).json({ error: 'Ne mogu spremiti podatke na server.' });
    }

    res.json({ message: 'Podaci su spremljeni' });
  } catch (error) {
    console.error('Greška na serveru:', error);
    res.status(500).json({ error: 'Došlo je do greške na serveru.' });
  }
});

app.listen(PORT, () => console.log(`Server radi na http://localhost:${PORT}`));
