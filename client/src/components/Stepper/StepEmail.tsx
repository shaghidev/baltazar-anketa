'use client'

import React from 'react'

interface StepEmailProps {
  email: string
  setEmail: (value: string) => void
  valid: boolean
}

export default function StepEmail({ email, setEmail, valid }: StepEmailProps) {
  return (
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
            valid
              ? 'border-[#0057B7] focus:ring-[#0057B7] focus:border-[#0057B7]'
              : 'border-red-500 focus:ring-red-400 focus:border-red-500'
          }`}
      />
      {!valid && (
        <p className="text-red-600 text-sm italic">Unesite ispravan email.</p>
      )}
    </div>
  )
}
