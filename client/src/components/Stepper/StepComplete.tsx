'use client'

import React from 'react'
import { PersonalityType } from '../hooks/scoring'

interface StepCompleteProps {
  personality: PersonalityType | null
  submitted: boolean
  name: string
  showWhatsApp: boolean
}

export default function StepComplete({ personality, submitted, name, showWhatsApp }: StepCompleteProps) {
  if (!submitted) {
    return <p className="text-center text-gray-600">Molimo dovršite kviz da vidite rezultate.</p>
  }

  if (!personality) {
    return <p className="text-center text-red-600">Greška: Nema podataka o osobnosti.</p>
  }

  return (
    <div className="flex flex-col items-center p-6 max-w-md mx-auto relative  ">
      <h2 className="text-3xl font-bold mb-4 text-center text-[#0057B7]">
        Tvoja supermoć iz Baltazargrada je:
      </h2>
      <h3 className="text-2xl text-blue-700 font-semibold mb-6 text-center">{personality.name}</h3>
      <p className="text-gray-800 whitespace-pre-line mb-12 text-center leading-relaxed">
        {personality.description}
      </p>

      <div
        className="
          relative
          border-4 border-yellow-400
          rounded-xl
          bg-yellow-50
          p-8
          shadow-lg
          text-center
          select-none
          w-full
        "
      >
        <h3 className="text-2xl font-extrabold mb-6 text-yellow-700 tracking-wide">
          Diploma počasnog građanina Baltazargrada
        </h3>

        <p className="mb-4 text-lg">Ovom diplomom se potvrđuje da</p>

        <p className="text-3xl font-bold mb-6 text-yellow-800">{name}</p>

        <p className="mb-6 text-lg">
          je stekao/la titulu <span className="font-semibold underline">{personality.name}</span> – supermoći iz Baltazargrada!
        </p>

        <div className="mt-12">
          <p className="border-t border-yellow-400 pt-4 w-48 mx-auto font-handwriting text-3xl text-yellow-700">
            Profesor Baltazar
          </p>
          <p className="mt-1 font-semibold tracking-wide italic text-yellow-700">
            (direktor radionice izuma)
          </p>
        </div>

        <div className="absolute top-4 left-4 w-10 h-10 bg-yellow-300 rounded-full rotate-45 shadow-md"></div>
        <div className="absolute bottom-4 right-4 w-14 h-14 bg-yellow-200 rounded-full shadow-inner"></div>
      </div>

      {showWhatsApp && (
        <div className="mt-8 p-4 bg-green-100 border border-green-400 rounded-lg text-green-800 font-semibold text-center max-w-sm">
          🎉 Pridruži se našoj WhatsApp grupi za više zabave i informacija!<br />
          <a
            href="https://chat.whatsapp.com/IO2CwQaesTK8VnV6yHl99N"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Klikni ovdje za pristup grupi
          </a>
        </div>
      )}
    </div>
  )
}
