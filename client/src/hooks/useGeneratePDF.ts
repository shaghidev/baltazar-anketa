'use client'
import { jsPDF } from 'jspdf'

export function useGeneratePDF() {
  const generatePDF = (name: string, email: string, personality: string) => {
    const doc = new jsPDF()
    doc.setFontSize(24)
    doc.text('Diploma o osobnosti', 20, 30)
    doc.setFontSize(18)
    doc.text(`Ime: ${name}`, 20, 60)
    doc.text(`Email: ${email}`, 20, 80)
    doc.text(`Tip osobnosti: ${personality}`, 20, 100)
    doc.save(`diploma-${name}.pdf`)
  }

  return { generatePDF }
}
