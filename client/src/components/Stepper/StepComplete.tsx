'use client'

import React from 'react'
import { PersonalityType } from '../hooks/scoring'

interface StepCompleteProps {
  personality: PersonalityType | null
  submitted: boolean
  name: string
}

export default function StepComplete({ personality, submitted, name }: StepCompleteProps) {
  if (!submitted) {
    return <p className="text-center text-gray-600">Molimo dovršite kviz da vidite rezultate.</p>
  }

  if (!personality) {
    return <p className="text-center text-red-600">Greška: Nema podataka o osobnosti.</p>
  }

  return (
    <div className="text-center p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Tvoja supermoć iz Baltazargrada je:</h2>
      <h3 className="text-xl text-blue-700 font-semibold mb-6">{personality.name}</h3>
      <p className="text-gray-800 whitespace-pre-line mb-10">{personality.description}</p>

      <div
        className="
          relative
          border-4 border-yellow-400
          rounded-xl
          bg-yellow-50
          p-8
          shadow-lg
          text-left
          select-none
        "
      >
        {/* Naslov diplome */}
        <h3 className="text-2xl font-extrabold mb-6 text-center text-yellow-700 tracking-wide">
          Diploma počasnog građanina Baltazargrada
        </h3>

        {/* Tekst diplome */}
        <p className="mb-4 text-lg">
          Ovom diplomom se potvrđuje da
        </p>

        <p className="text-3xl font-bold mb-6 text-yellow-800">{name}</p>

        <p className="mb-6 text-lg">
          je stekao/la titulu <span className="font-semibold underline">{personality.name}</span> – supermoći iz Baltazargrada!
        </p>

        {/* Potpis */}
        <div className="mt-12">
          <p className="border-t border-yellow-400 pt-4 w-48 mx-auto text-center font-handwriting text-3xl text-yellow-700">
            Profesor Baltazar
          </p>
          <p className="text-center text-yellow-700 mt-1 font-semibold tracking-wide italic">
            (direktor radionice izuma)
          </p>
        </div>

        {/* Ukrasni elementi - možeš dodati SVG-ove ili jednostavne oblike */}
        <div className="absolute top-4 left-4 w-10 h-10 bg-yellow-300 rounded-full rotate-45 shadow-md"></div>
        <div className="absolute bottom-4 right-4 w-14 h-14 bg-yellow-200 rounded-full shadow-inner"></div>
      </div>
    </div>
  )
}
