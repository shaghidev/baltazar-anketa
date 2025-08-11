'use client'
import { jsPDF } from 'jspdf'

export function useGeneratePDF() {
  const generatePDF = (name: string, personality: string) => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: 'a4',
    })

    // Pozadinski okvir s tankim zlatnim borderom
    doc.setDrawColor(205, 170, 125) // zlatna boja
    doc.setLineWidth(4)
    doc.rect(20, 20, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 40)

    // Naslov diplome
    doc.setFont('times', 'bolditalic')
    doc.setFontSize(48)
    doc.setTextColor(102, 51, 0) // tamno smeđa
    doc.text('Diploma o osobnosti', doc.internal.pageSize.width / 2, 100, { align: 'center' })

    // Horizontalna linija ispod naslova
    doc.setDrawColor(205, 170, 125)
    doc.setLineWidth(1)
    doc.line(100, 120, doc.internal.pageSize.width - 100, 120)

    // Ime osobe
    doc.setFont('times', 'normal')
    doc.setFontSize(28)
    doc.setTextColor(0, 0, 0)
    doc.text(`Dodjeljuje se:`, doc.internal.pageSize.width / 2, 180, { align: 'center' })

    doc.setFont('times', 'bold')
    doc.setFontSize(36)
    doc.text(name, doc.internal.pageSize.width / 2, 220, { align: 'center' })

    // Tip osobnosti
    doc.setFont('times', 'italic')
    doc.setFontSize(24)
    doc.text(`za dokazivanje osobnosti tipa:`, doc.internal.pageSize.width / 2, 280, { align: 'center' })

    doc.setFont('times', 'bolditalic')
    doc.setFontSize(30)
    doc.setTextColor(102, 51, 0)
    doc.text(personality, doc.internal.pageSize.width / 2, 320, { align: 'center' })

    // Datum i potpis (mjesto za potpis)
    const today = new Date().toLocaleDateString()
    doc.setFont('times', 'normal')
    doc.setFontSize(16)
    doc.setTextColor(50, 50, 50)
    doc.text(`Datum: ${today}`, 60, doc.internal.pageSize.height - 80)

    doc.text('____________________', doc.internal.pageSize.width - 160, doc.internal.pageSize.height - 80)
    doc.text('Potpis', doc.internal.pageSize.width - 130, doc.internal.pageSize.height - 60)

    // Spremi PDF
    doc.save(`diploma-${name}.pdf`)
  }

  return { generatePDF }
}
