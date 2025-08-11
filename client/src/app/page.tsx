'use client'

import { useState, useEffect } from 'react'
import { jsPDF } from 'jspdf'
import Stepper, { Step } from '../components/Stepper/Stepper'

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [validStep1, setValidStep1] = useState(false)
  const [validStep2, setValidStep2] = useState(false)
  const [validStep3, setValidStep3] = useState(false)

  useEffect(() => setValidStep1(name.trim().length > 0), [name])
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setValidStep2(emailRegex.test(email))
  }, [email])
  useEffect(() => setValidStep3(consent), [consent])

  const calculatePersonality = (): string => {
    return 'Ekstrovert'
  }

  const generatePDF = (name: string, personality: string) => {
    const doc = new jsPDF()
    doc.setFontSize(24)
    doc.text('Diploma o osobnosti', 20, 30)
    doc.setFontSize(18)
    doc.text(`Ime: ${name}`, 20, 60)
    doc.text(`Tip osobnosti: ${personality}`, 20, 90)
    doc.save(`diploma-${name}.pdf`)
  }

  const handleFinalStepComplete = () => {
    if (!validStep1) return alert('Unesite ime.')
    if (!validStep2) return alert('Unesite ispravan email.')
    if (!validStep3) return alert('Morate prihvatiti GDPR uvjete.')

    const personalityType = calculatePersonality()
    generatePDF(name, personalityType)
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-baltazarGray font-baltazar p-6">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-10">
        <h1 className="text-4xl font-extrabold mb-12 text-center text-[#0057B7] tracking-wide">
          Anketa osobnosti
        </h1>

        <Stepper
          initialStep={1}
          onFinalStepCompleted={handleFinalStepComplete}
          backButtonText="Nazad"
          nextButtonText="Dalje"
          className="space-y-14"
        >
          <Step>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-[#0057B7]">Ime</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Unesite ime"
                className={`w-full rounded-xl border-2 p-3 text-gray-900 placeholder-gray-400
                  transition focus:outline-none focus:ring-4 focus:ring-offset-1
                  ${
                    validStep1
                      ? 'border-[#0057B7] focus:ring-[#0057B7] focus:border-[#0057B7]'
                      : 'border-red-500 focus:ring-red-400 focus:border-red-500'
                  }`}
              />
              {!validStep1 && (
                <p className="text-red-600 text-sm italic">Ime je obavezno.</p>
              )}
            </div>
          </Step>

          <Step>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-[#0057B7]">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Unesite email"
                className={`w-full rounded-xl border-2 p-3 text-gray-900 placeholder-gray-400
                  transition focus:outline-none focus:ring-4 focus:ring-offset-1
                  ${
                    validStep2
                      ? 'border-[#0057B7] focus:ring-[#0057B7] focus:border-[#0057B7]'
                      : 'border-red-500 focus:ring-red-400 focus:border-red-500'
                  }`}
              />
              {!validStep2 && (
                <p className="text-red-600 text-sm italic">Unesite ispravan email.</p>
              )}
            </div>
          </Step>

          <Step>
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={e => setConsent(e.target.checked)}
                  id="consent"
                  className={`w-6 h-6 rounded border-2 border-gray-400
                    transition focus:outline-none focus:ring-4 focus:ring-offset-1
                    ${
                      validStep3
                        ? 'focus:ring-[#0057B7] border-[#0057B7]'
                        : 'focus:ring-red-400 border-red-500'
                    }`}
                />
                <span className="text-lg text-[#0057B7]">Prihvaćam GDPR uvjete</span>
              </label>
              {!validStep3 && (
                <p className="text-red-600 text-sm italic ml-9">
                  Morate prihvatiti GDPR uvjete.
                </p>
              )}
            </div>
          </Step>

          <Step>
            <div className="text-center">
              {submitted ? (
                <p className="text-green-600 font-semibold text-lg">
                  Hvala! Diploma je generirana i spremna za preuzimanje.
                </p>
              ) : (
                <p className="font-semibold text-[#0057B7] text-lg">
                  Kliknite "Complete" za generiranje diplome.
                </p>
              )}
            </div>
          </Step>
        </Stepper>
      </div>
    </main>
  )
}
