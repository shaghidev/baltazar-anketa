import express from 'express';
import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import nodemailer from 'nodemailer';
import fontkit from '@pdf-lib/fontkit';
import { createCanvas, loadImage } from 'canvas';
import pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, personalityKey } = req.body;

  try {
    if (!name || !email || !personalityKey) {
      return res.status(400).json({ error: 'Nedostaju obavezni podaci: name, email ili personalityKey' });
    }

    const jsonPath = path.join(process.cwd(), 'config', 'personalities.json');
    const personalityData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const personality = personalityData.find(p => p.key === personalityKey);
    if (!personality) return res.status(404).json({ error: 'Nepoznat personalityKey' });

    const templatePath = path.join(process.cwd(), 'public', personality.template);
    const existingPdfBytes = fs.readFileSync(templatePath);

    
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const today = new Date();
    const formattedDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
    firstPage.drawText(name, { x: 150, y: 370, size: 36, font, color: rgb(0, 0, 0) });
    firstPage.drawText(formattedDate, { x: 40, y: 55, size: 16, font, color: rgb(0, 0, 0) });

    const pdfBytes = await pdfDoc.save();
    const tmpPdfPath = path.join(process.cwd(), 'tmp', `temp-${name}.pdf`);
    if (!fs.existsSync(path.dirname(tmpPdfPath))) fs.mkdirSync(path.dirname(tmpPdfPath));
    fs.writeFileSync(tmpPdfPath, pdfBytes);

 
    const loadingTask = pdfjsLib.getDocument(tmpPdfPath);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 2 });

    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext('2d');

    await page.render({ canvasContext: context, viewport }).promise;
    const imageBase64 = canvas.toDataURL('image/png').split(',')[1]; // samo base64 dio

    // 3️⃣ Pošalji email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const safeName = name.replace(/[^a-z0-9]/gi, '_');

    await transporter.sendMail({
      from: `"Baltazar Kviz" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Tvoja diploma iz Baltazargrada - ${personality.name}`,
      text: `Hej ${name}, tvoja supermoć je ${personality.name}!\n\n${personality.description}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color:#333;">Hej ${name}!</h2>
          <h3 style="color:#007acc;">Tvoja supermoć: ${personality.name}</h3>
          <p style="font-size:16px; color:#555;">${personality.description}</p>
          <p style="margin-top:20px;">Tvoja diploma je ispod:</p>
          <img src="data:image/png;base64,${imageBase64}" style="width:100%; max-width:600px; border:1px solid #ccc;" />
          <p style="margin-top:10px;">PDF možeš preuzeti <a href="cid:diploma">ovdje</a>.</p>
        </div>
      `,
      attachments: [
        { filename: `diploma-${safeName}.pdf`, content: pdfBytes, contentType: 'application/pdf', cid: 'diploma' }
      ],
    });

    fs.unlinkSync(tmpPdfPath);
    console.log(`Diploma poslana: ${name} (${email}) - ${personality.name}`);
    res.json({ success: true, message: `Diploma poslana za ${name}!` });

  } catch (err) {
    console.error("Greška pri slanju diplome:", err);
    res.status(500).json({ error: "Neuspješno slanje diplome", details: err.message || err.toString() });
  }
});

export default router;
