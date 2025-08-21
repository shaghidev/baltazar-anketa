import express from 'express';
import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import nodemailer from 'nodemailer';
import fontkit from '@pdf-lib/fontkit';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, personalityKey } = req.body;

  try {
    if (!name || !email || !personalityKey) {
      return res.status(400).json({ error: 'Nedostaju obavezni podaci: name, email ili personalityKey' });
    }

    // 1️⃣ Odabir template-a prema personalityKey
    const templateMap = {
      knowledge: 'knowledge.pdf',
      creativity: 'creativity.pdf',
      curiosity: 'curiosity.pdf',
    };

    const templateFile = templateMap[personalityKey] || 'knowledge.pdf';
    const templatePath = path.join(process.cwd(), 'public', 'templates', templateFile);

    if (!fs.existsSync(templatePath)) {
      return res.status(404).json({ error: 'Template PDF ne postoji' });
    }

    const existingPdfBytes = fs.readFileSync(templatePath);

    // 2️⃣ Učitaj PDF i embed font
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit); // omogućava korištenje custom fontova ako treba
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Standard font podržava hrvatske znakove
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // 3️⃣ Dodaj ime i datum
    const today = new Date();
    const formattedDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;

    firstPage.drawText(name, { x: 150, y: 370, size: 36, font, color: rgb(0, 0, 0) });
    firstPage.drawText(formattedDate, { x: 40, y: 55, size: 16, font, color: rgb(0, 0, 0) });

    const pdfBytes = await pdfDoc.save();

    // 4️⃣ Pošalji email s PDF-om
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true, // true za port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Baltazar Kviz" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Tvoja diploma iz Baltazargrada",
      text: `Hej ${name}, tvoja supermoć je ${personalityKey}!`,
      html: `<p>Hej <b>${name}</b>, tvoja supermoć je <b>${personalityKey}</b>!</p>`,
      attachments: [
        {
          filename: `diploma-${name}.pdf`,
          content: pdfBytes,
          contentType: 'application/pdf',
        },
      ],
    });

    res.json({ success: true, message: `Diploma poslana za ${name}!` });
  } catch (err) {
    console.error("Greška pri slanju diplome:", err);
    res.status(500).json({ error: "Neuspješno slanje diplome", details: err.message });
  }
});

export default router;
