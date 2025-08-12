'use client'

import React from 'react'

interface StepNameProps {
  name: string
  setName: (value: string) => void
  valid: boolean
}

export default function StepName({ name, setName, valid }: StepNameProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-lg font-semibold text-[#0057B7]">Ime</label>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Unesite ime"
        className={`w-full rounded-xl border-2 p-3 text-gray-900 placeholder-red-500
          transition focus:outline-none focus:ring-4 focus:ring-offset-1
          ${
            valid
              ? 'border-[#0057B7] focus:ring-[#0057B7] focus:border-[#0057B7]'
              : 'border-red-500 focus:ring-red-400 focus:border-red-500'
          }`}
      />
      {!valid && (
        <p className="text-red-600 text-sm italic">Ime je obavezno.</p>
      )}
    </div>
  )
}
