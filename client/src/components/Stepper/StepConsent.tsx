'use client'

import React from 'react'

interface StepConsentProps {
  consent: boolean
  setConsent: (value: boolean) => void
  valid: boolean
}

export default function StepConsent({ consent, setConsent, valid }: StepConsentProps) {
  return (
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
              valid
                ? 'focus:ring-[#0057B7] border-[#0057B7]'
                : 'focus:ring-red-400 border-red-500'
            }`}
        />
<span className="text-lg text-[#0057B7]">
  Prihvaćam{' '}
  <a
    href="https://git.hr/opci-uvjeti-koristenja/?srsltid=AfmBOooH3u5SFZKr_-YQmafsSeyZCdPGnhrRAlU6m73zoEF8kYfnNPmW"
    className="text-[#0057B7] underline"
    target="_blank"
    rel="noopener noreferrer"
  >
    GDPR uvjete
  </a>
</span>
      </label>
      {!valid && (
        <p className="text-red-600 text-sm italic ml-9">
          Morate prihvatiti GDPR uvjete.
        </p>
      )}
    </div>
  )
}
