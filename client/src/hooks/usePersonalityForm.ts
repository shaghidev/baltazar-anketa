'use client'

import { useState, useEffect } from 'react'
import { jsPDF } from 'jspdf'

export default function usePersonalityForm() {
  // Form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Validacija po koracima
  const [validStep1, setValidStep1] = useState(false)
  const [validStep2, setValidStep2] = useState(false)
  const [validStep3, setValidStep3] = useState(false)

  // Validacija inputa
  useEffect(() => setValidStep1(name.trim().length > 0), [name])
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setValidStep2(emailRegex.test(email))
  }, [email])
  useEffect(() => setValidStep3(consent), [consent])

  // Logika izračuna osobnosti
  const calculatePersonality = (): string => {
    return 'Ekstrovert' // ovdje možeš dodati složeniju logiku
  }

  // Funkcija za generiranje PDF-a
  const generatePDF = (name: string, personality: string) => {
    const doc = new jsPDF()
    doc.setFontSize(24)
    doc.text('Diploma o osobnosti', 20, 30)
    doc.setFontSize(18)
    doc.text(`Ime: ${name}`, 20, 60)
    doc.text(`Tip osobnosti: ${personality}`, 20, 90)
    doc.save(`diploma-${name}.pdf`)
  }

  // Funkcija za finalni submit
  const handleFinalStepComplete = () => {
    if (!validStep1) return alert('Unesite ime.')
    if (!validStep2) return alert('Unesite ispravan email.')
    if (!validStep3) return alert('Morate prihvatiti GDPR uvjete.')

    const personalityType = calculatePersonality()
    generatePDF(name, personalityType)
    setSubmitted(true)
  }

  return {
    name,
    setName,
    email,
    setEmail,
    consent,
    setConsent,
    submitted,
    validStep1,
    validStep2,
    validStep3,
    handleFinalStepComplete,
  }
}
