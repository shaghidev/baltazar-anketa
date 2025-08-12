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
    <div className="flex flex-col items-center p-0 sm:p-8 max-w-full mx-auto relative rounded-xl">

      {/* Naslov rezultata */}
      <h2 className="text-3xl sm:text-5xl text-[#205c13] font-semibold mb-4 sm:mb-6 text-center break-words">
        {personality.name}
      </h2>

      {/* Opis */}
      <p className="text-gray-800 whitespace-pre-line mb-8 sm:mb-12 text-center leading-relaxed text-base sm:text-lg px-2">
        {personality.description}
      </p>

      {/* Diploma */}
      <div
        className="
          relative
          border-4 border-yellow-400
          rounded-xl
          bg-yellow-50
          p-5 sm:p-8
          shadow-lg
          text-center
          select-none
          w-full
          max-w-[400px] sm:max-w-[500px]
        "
      >
        <h3 className="text-xl sm:text-2xl font-extrabold mb-4 sm:mb-6 text-yellow-700 tracking-wide">
          Diploma počasnog građanina Baltazargrada
        </h3>

        <p className="mb-2 sm:mb-4 text-base sm:text-lg">Ovom diplomom se potvrđuje da</p>

        <p className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-yellow-800 break-words">{name}</p>

        <p className="mb-4 sm:mb-6 text-base sm:text-lg">
          je stekao/la titulu <span className="font-semibold underline">{personality.name}</span> – supermoći iz Baltazargrada!
        </p>

        {/* Potpis */}
        <div className="mt-8 sm:mt-12">
          <p className="border-t border-yellow-400 pt-3 sm:pt-4 w-40 sm:w-48 mx-auto font-handwriting text-2xl sm:text-3xl text-yellow-700">
            Profesor Baltazar
          </p>
          <p className="mt-1 font-semibold tracking-wide italic text-yellow-700 text-sm sm:text-base">
            (direktor radionice izuma)
          </p>
        </div>

        {/* Dekorativni elementi */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-6 sm:w-10 h-6 sm:h-10 bg-yellow-300 rounded-full rotate-45 shadow-md"></div>
        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-8 sm:w-14 h-8 sm:h-14 bg-yellow-200 rounded-full shadow-inner"></div>
      </div>

      {/* WhatsApp poziv */}
      {showWhatsApp && (
        <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-green-100 border border-green-400 rounded-lg text-green-800 font-semibold text-center w-full max-w-[320px] sm:max-w-sm text-sm sm:text-base">
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
