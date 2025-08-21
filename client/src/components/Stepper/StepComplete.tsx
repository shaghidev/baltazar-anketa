'use client'

import React from 'react'
import { PersonalityType } from '../hooks/scoring'
import { useGeneratePDF } from '../hooks/useGeneratePDF'

interface StepCompleteProps {
  personality: PersonalityType | null
  submitted: boolean
  name: string
  showWhatsApp: boolean
  email: string
}


export default function StepComplete({ personality, submitted, name, showWhatsApp, email }: StepCompleteProps) {
  const { generatePDF } = useGeneratePDF()

  if (!submitted) {
    return <p className="text-center text-gray-600">Molimo dovršite kviz da vidite rezultate.</p>
  }

  if (!personality) {
    return <p className="text-center text-red-600">Greška: Nema podataka o osobnosti.</p>
  }

  const handleWhatsAppClick = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/send-diploma`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, personalityKey: personality.key })
      })
      
      const data = await res.json()
      console.log(data)
  
      window.open('https://chat.whatsapp.com/IO2CwQaesTK8VnV6yHl99N', '_blank')
    } catch (err) {
      console.error('Greška slanja diplome', err)
    }
  }
  
  


  return (
    <div className="flex flex-col items-center p-0 sm:p-8 max-w-full mx-auto relative rounded-xl">

      <h2 className="text-3xl sm:text-5xl text-[#205c13] font-semibold mb-4 sm:mb-6 text-center break-words">
        {personality.name}
      </h2>

      <p className="text-gray-800 whitespace-pre-line mb-8 sm:mb-12 text-center leading-relaxed text-base sm:text-lg px-2">
        {personality.description}
      </p>

      {showWhatsApp && (
        <button
          onClick={handleWhatsAppClick}
          className="mt-6 sm:mt-8 p-3 sm:p-4 bg-green-100 border border-green-400 rounded-lg text-green-800 font-semibold text-center w-full max-w-[320px] sm:max-w-sm text-sm sm:text-base hover:bg-green-200 transition"
        >
          🎉 Preuzmi diplomu i pridruži se WhatsApp grupi!
        </button>
      )}
    </div>
  )
}
