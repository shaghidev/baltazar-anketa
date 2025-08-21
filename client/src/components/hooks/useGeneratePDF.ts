'use client'

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { PERSONALITY_TYPES } from '../hooks/scoring'

export function useGeneratePDF() {
  const generatePDF = async (name: string, personalityKey: string) => {
    try {
      const personality = PERSONALITY_TYPES[personalityKey]
      if (!personality) throw new Error("Nepoznat tip osobnosti")

      // Učitaj PDF template iz public foldera
      const existingPdfBytes = await fetch(personality.template).then(res => {
        if (!res.ok) throw new Error(`PDF not found: ${personality.template}`)
        return res.arrayBuffer()
      })

      const pdfDoc = await PDFDocument.load(existingPdfBytes)
      const pages = pdfDoc.getPages()
      const firstPage = pages[0]

      // Embed font
      const font = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)

      // Dodaj samo ime
      firstPage.drawText(name, {
        x: 150,
        y: 370,
        size: 36,
        font,
        color: rgb(0, 0, 0),
      })

      // Datum
      const today = new Date().toLocaleDateString()
      firstPage.drawText(`${today}`, {
        x: 40,
        y: 55,
        size: 16,
        font,
        color: rgb(0, 0, 0),
      })

      // **Spremi PDF**
      const pdfBytes = await pdfDoc.save()

      // Pretvori u ArrayBuffer kompatibilan s Blob
      const arrayBuffer = pdfBytes.buffer instanceof ArrayBuffer ? pdfBytes.buffer : pdfBytes.slice().buffer
      
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `diploma-${name}.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      
    } catch (error: unknown) {
      console.error("❌ Greška pri generiranju PDF-a:", error)
    }
  }

  return { generatePDF }
}
