'use client'

import React from 'react'

interface StepPersonalityQuestionsProps {
  favoriteColor: string
  setFavoriteColor: (value: string) => void
  socialSituation: string
  setSocialSituation: (value: string) => void
  planFrequency: string
  setPlanFrequency: (value: string) => void
  decisionStyle: string
  setDecisionStyle: (value: string) => void
  routineImportance: string
  setRoutineImportance: (value: string) => void
  validations: {
    validName: boolean
    validEmail: boolean
    validConsent: boolean
    validFavoriteColor: boolean
    validSocialSituation: boolean
    validPlanFrequency: boolean
    validDecisionStyle: boolean
    validRoutineImportance: boolean
  }
}

export default function StepPersonalityQuestions({
  favoriteColor,
  setFavoriteColor,
  socialSituation,
  setSocialSituation,
  planFrequency,
  setPlanFrequency,
  decisionStyle,
  setDecisionStyle,
  routineImportance,
  setRoutineImportance,
  validations,
}: StepPersonalityQuestionsProps) {
  return (
    <div className="flex flex-col gap-6">


      {/* Omiljena boja */}
      <div className="flex flex-col gap-1">
        <label className="text-lg font-semibold text-[#0057B7]">
          Omiljena boja
        </label>
        <select
          value={favoriteColor}
          onChange={e => setFavoriteColor(e.target.value)}
          className={`w-full rounded-xl border-2 p-3 text-gray-900
            transition focus:outline-none focus:ring-4 focus:ring-offset-1
            ${
              validations.validFavoriteColor
                ? 'border-[#0057B7] focus:ring-[#0057B7] focus:border-[#0057B7]'
                : 'border-red-500 focus:ring-red-400 focus:border-red-500'
            }`}
        >
          <option value="">Odaberite boju...</option>
          <option value="plava">Plava</option>
          <option value="zelena">Zelena</option>
          <option value="crvena">Crvena</option>
          <option value="žuta">Žuta</option>
          <option value="ljubičasta">Ljubičasta</option>
        </select>
        {!validations.validFavoriteColor && (
          <p className="text-red-600 text-sm italic">Molimo odaberite boju.</p>
        )}
      </div>

      {/* Društvene situacije */}
      <div className="flex flex-col gap-1">
        <label className="text-lg font-semibold text-[#0057B7]">
          Kako se osjećate u društvenim situacijama?
        </label>
        <select
          value={socialSituation}
          onChange={e => setSocialSituation(e.target.value)}
          className={`w-full rounded-xl border-2 p-3 text-gray-900
            transition focus:outline-none focus:ring-4 focus:ring-offset-1
            ${
              validations.validSocialSituation
                ? 'border-[#0057B7] focus:ring-[#0057B7] focus:border-[#0057B7]'
                : 'border-red-500 focus:ring-red-400 focus:border-red-500'
            }`}
        >
          <option value="">Odaberite...</option>
          <option value="samostalan">Samostalan/a</option>
          <option value="društven">Društven/a</option>
          <option value="povučena">Povučena osoba</option>
          <option value="neutralan">Neutralan/a</option>
        </select>
        {!validations.validSocialSituation && (
          <p className="text-red-600 text-sm italic">
            Molimo odaberite opciju.
          </p>
        )}
      </div>

      {/* Koliko često planiraš? */}
      <div className="flex flex-col gap-1">
        <label className="text-lg font-semibold text-[#0057B7]">
          Koliko često planirate svoje aktivnosti?
        </label>
        <select
          value={planFrequency}
          onChange={e => setPlanFrequency(e.target.value)}
          className={`w-full rounded-xl border-2 p-3 text-gray-900
            transition focus:outline-none focus:ring-4 focus:ring-offset-1
            ${
              validations.validPlanFrequency
                ? 'border-[#0057B7] focus:ring-[#0057B7] focus:border-[#0057B7]'
                : 'border-red-500 focus:ring-red-400 focus:border-red-500'
            }`}
        >
          <option value="">Odaberite...</option>
          <option value="svaki_dan">Svaki dan</option>
          <option value="tjedno">Tjedno</option>
          <option value="mjesecno">Mjesečno</option>
          <option value="rijetko">Rijetko</option>
        </select>
        {!validations.validPlanFrequency && (
          <p className="text-red-600 text-sm italic">Molimo odaberite opciju.</p>
        )}
      </div>

      {/* Stil donošenja odluka */}
      <div className="flex flex-col gap-1">
        <label className="text-lg font-semibold text-[#0057B7]">
          Kako donosite odluke?
        </label>
        <select
          value={decisionStyle}
          onChange={e => setDecisionStyle(e.target.value)}
          className={`w-full rounded-xl border-2 p-3 text-gray-900
            transition focus:outline-none focus:ring-4 focus:ring-offset-1
            ${
              validations.validDecisionStyle
                ? 'border-[#0057B7] focus:ring-[#0057B7] focus:border-[#0057B7]'
                : 'border-red-500 focus:ring-red-400 focus:border-red-500'
            }`}
        >
          <option value="">Odaberite...</option>
          <option value="impulzivan">Impulzivan/a</option>
          <option value="promišljen">Promišljen/a</option>
          <option value="savjetuje_se">Savjetuje se s drugima</option>
          <option value="spor">Spor/a</option>
        </select>
        {!validations.validDecisionStyle && (
          <p className="text-red-600 text-sm italic">Molimo odaberite opciju.</p>
        )}
      </div>

      {/* Važnost rutine */}
      <div className="flex flex-col gap-1">
        <label className="text-lg font-semibold text-[#0057B7]">
          Koliko vam je rutina važna?
        </label>
        <select
          value={routineImportance}
          onChange={e => setRoutineImportance(e.target.value)}
          className={`w-full rounded-xl border-2 p-3 text-gray-900
            transition focus:outline-none focus:ring-4 focus:ring-offset-1
            ${
              validations.validRoutineImportance
                ? 'border-[#0057B7] focus:ring-[#0057B7] focus:border-[#0057B7]'
                : 'border-red-500 focus:ring-red-400 focus:border-red-500'
            }`}
        >
          <option value="">Odaberite...</option>
          <option value="vrlo_vazna">Vrlo važna</option>
          <option value="umjereno_vazna">Umjereno važna</option>
          <option value="nije_vazna">Nije važna</option>
        </select>
        {!validations.validRoutineImportance && (
          <p className="text-red-600 text-sm italic">Molimo odaberite opciju.</p>
        )}
      </div>
    </div>
  )
}
