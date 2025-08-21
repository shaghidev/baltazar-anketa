import express from "express";
import fs from "fs";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import nodemailer from "nodemailer";
import fontkit from "@pdf-lib/fontkit";
import { fromPath } from "pdf2pic";

const router = express.Router();

router.post("/", async (req, res) => {
	const { name, email, personalityKey } = req.body;

	try {
		if (!name || !email || !personalityKey) {
			return res
				.status(400)
				.json({
					error: "Nedostaju obavezni podaci: name, email ili personalityKey",
				});
		}

		// 1️⃣ Učitaj personality tipove iz JSON-a
		const jsonPath = path.join(process.cwd(), "config", "personalities.json");
		if (!fs.existsSync(jsonPath))
			return res
				.status(500)
				.json({ error: "Datoteka personalities.json ne postoji" });

		const personalityData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
		const personality = personalityData.find((p) => p.key === personalityKey);
		if (!personality)
			return res.status(404).json({ error: "Nepoznat personalityKey" });

		const templatePath = path.join(
			process.cwd(),
			"public",
			personality.template
		);
		if (!fs.existsSync(templatePath))
			return res.status(404).json({ error: "Template PDF ne postoji" });

		const existingPdfBytes = fs.readFileSync(templatePath);

		// 2️⃣ Učitaj PDF i embed font
		const pdfDoc = await PDFDocument.load(existingPdfBytes);
		pdfDoc.registerFontkit(fontkit);
		const pages = pdfDoc.getPages();
		const firstPage = pages[0];
		const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

		const today = new Date();
		const formattedDate = `${today.getDate()}.${
			today.getMonth() + 1
		}.${today.getFullYear()}`;

		const xCoordinate = name.length * 36;
		firstPage.drawText(name, {
			x: 150,
			y: 370,
			size: 36,
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

		// 3️⃣ Spremi privremeni PDF
		const tmpDir = path.join(process.cwd(), "tmp");
		if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
		const tmpPdfPath = path.join(tmpDir, `temp-${name}.pdf`);
		fs.writeFileSync(tmpPdfPath, pdfBytes);

		// 4️⃣ Pretvori PDF u PNG
		const converter = fromPath(tmpPdfPath, {
			density: 150,
			saveFilename: `temp-${name}`,
			savePath: tmpDir,
			format: "png",
			width: 600,
			height: 800,
		});
		const pageImage = await converter(1);
		const imageBase64 = fs.readFileSync(pageImage.path).toString("base64");

		// 5️⃣ Pošalji email
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: parseInt(process.env.SMTP_PORT || "465"),
			secure: true,
			auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
		});

		const safeName = name.replace(/[^a-z0-9]/gi, "_");

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
				{
					filename: `diploma-${safeName}.pdf`,
					content: pdfBytes,
					contentType: "application/pdf",
					cid: "diploma",
				},
			],
		});

		// 6️⃣ Očisti privremene fajlove
		fs.unlinkSync(tmpPdfPath);
		fs.unlinkSync(pageImage.path);

		console.log(`Diploma poslana: ${name} (${email}) - ${personality.name}`);
		res.json({ success: true, message: `Diploma poslana za ${name}!` });
	} catch (err) {
		console.error("Greška pri slanju diplome:", err);
		res
			.status(500)
			.json({
				error: "Neuspješno slanje diplome",
				details: err.message || err.toString(),
			});
	}
});

export default router;
