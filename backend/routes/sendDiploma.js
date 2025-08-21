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
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const today = new Date();
    const formattedDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
    const { width, height } = firstPage.getSize();

    const fontSize = 36
    const textWidth = font.widthOfTextAtSize(name, fontSize)
    const xCoordinate = (width - textWidth) / 2;
		firstPage.drawText(name, {
			x: xCoordinate,
			y: 370,
			size: fontSizes,
			font,
			color: rgb(0, 0, 0),
		});
		firstPage.drawText(formattedDate, {
			x: 40,
			y: 55,
			size: 16,
			font,
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
        <p>Hej <b>${name}</b>,</p>
        <p>Tvoja supermoć je <b>${personality.name}</b>!</p>
        <p>${personality.description}</p>
        <p>Diploma je u privitku.</p>
      `,
      attachments: [
        { filename: `diploma-${safeName}.pdf`, content: pdfBytes, contentType: 'application/pdf' }
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
