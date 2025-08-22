import express from 'express';
import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb } from 'pdf-lib';
import nodemailer from 'nodemailer';
import fontkit from '@pdf-lib/fontkit';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, personalityKey } = req.body;

  try {
    if (!name || !email || !personalityKey) {
      return res.status(400).json({ error: 'Nedostaju obavezni podaci: name, email ili personalityKey' });
    }

    const jsonPath = path.join(process.cwd(), 'config', 'personalities.json');
    if (!fs.existsSync(jsonPath)) {
      return res.status(500).json({ error: 'Datoteka personalities.json ne postoji' });
    }

    const personalityData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const personality = personalityData.find(p => p.key === personalityKey);
    if (!personality) return res.status(404).json({ error: 'Nepoznat personalityKey' });

    // 2️⃣ Učitaj template PDF i dodaj ime + datum
    const templatePath = path.join(process.cwd(), 'public', personality.template);
    if (!fs.existsSync(templatePath)) return res.status(404).json({ error: 'Template PDF ne postoji' });

    const existingPdfBytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);
    const firstPage = pdfDoc.getPages()[0];

    // 👇 Učitaj custom OTF font
    const fontPath = path.join(process.cwd(), 'fonts', 'ITC.otf'); // <-- zamijeni imenom svog fonta
    if (!fs.existsSync(fontPath)) {
      return res.status(500).json({ error: `Font datoteka ne postoji: ${fontPath}` });
    }
    const fontBytes = fs.readFileSync(fontPath);
    const customFont = await pdfDoc.embedFont(fontBytes);

    const today = new Date();
    const formattedDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
    const { width } = firstPage.getSize();

    const fontSize = 36;
    const textWidth = customFont.widthOfTextAtSize(name, fontSize);
    const xCoordinate = (width - textWidth) / 2;

    // 📝 Ispis imena u custom fontu
    firstPage.drawText(name, {
      x: xCoordinate,
      y: 370,
      size: fontSize,
      font: customFont,
      color: rgb(0, 0, 0),
    });

    // 📝 Ispis datuma u custom fontu
    firstPage.drawText(formattedDate, {
      x: 30,
      y: 55,
      size: 16,
      font: customFont,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    // 3️⃣ Pošalji email s PDF attachmentom
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const safeName = name.replace(/[^a-z0-9]/gi, '_');

    await transporter.sendMail({
      from: `"Profesor Baltazar" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Tvoja diploma iz Baltazargrada - ${personality.name}`,
      text: `Hej ${name}, tvoja supermoć je ${personality.name}!\n\n${personality.description}`,
      html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f7f7f7; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color:#333; text-align:center;">Čestitamo, ${name}!</h2>
          <h3 style="color:#007acc; text-align:center;">Tvoja supermoć: ${personality.name}</h3>
          <p style="font-size:16px; color:#555; line-height:1.5; text-align:center;">${personality.description}</p>
    
          <div style="text-align:center; margin-top:30px;">
            <p style="font-weight:bold; color:#333;">Tvoja diploma je u privitku 📎</p>
            <p style="font-size:14px; color:#777;">Možeš ju preuzeti ili otvoriti kao PDF.</p>
          </div>
    
          <footer style="text-align:center; margin-top:40px; font-size:12px; color:#aaa;">
            © ${new Date().getFullYear()} Baltazar Kviz
          </footer>
        </div>
      `,
      attachments: [
        {
          filename: `diploma-${safeName}.pdf`,
          content: pdfBytes,
          contentType: 'application/pdf',
        }
      ],
    });

    console.log(`Diploma poslana: ${name} (${email}) - ${personality.name}`);
    res.json({ success: true, message: `Diploma poslana za ${name}!` });

  } catch (err) {
    console.error("Greška pri slanju diplome:", err);
    res.status(500).json({ error: "Neuspješno slanje diplome", details: err.message || err.toString() });
  }
});

export default router;
