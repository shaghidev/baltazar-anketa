'use client'

import React from 'react'
import { PersonalityType } from '../hooks/scoring'

interface StepCompleteProps {
  personality: PersonalityType | null
  submitted: boolean
  name: string
  showWhatsApp: boolean
  email: string
}

export default function StepComplete({ personality, submitted, name, showWhatsApp, email }: StepCompleteProps) {

  if (!submitted) {
    return <p className="text-center text-gray-600">Molimo dovršite kviz da vidite rezultate.</p>
  }

  if (!personality) {
    return <p className="text-center text-red-600">Greška: Nema podataka o osobnosti.</p>
  }

  const handleWhatsAppClick = async () => {
    // Otvori WhatsApp odmah
    window.open('https://chat.whatsapp.com/IO2CwQaesTK8VnV6yHl99N', '_blank');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/send-diploma`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, personalityKey: personality.key })
      });

      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error('Greška slanja diplome', err);
    }
  };

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
          className="
            mt-6 sm:mt-8 
            p-4 
            bg-green-600 text-white font-bold 
            rounded-xl shadow-lg
            w-full max-w-[360px] sm:max-w-sm
            text-base sm:text-lg 
            hover:bg-green-700 hover:shadow-xl 
            transition-all duration-200
          "
        >
          Profesor Baltazar ti šalje diplomu! pridruži se susjedima 🧪
        </button>
      )}
    </div>
  )
}
