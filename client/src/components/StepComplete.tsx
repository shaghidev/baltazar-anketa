'use client'

import React from 'react'

interface StepCompleteProps {
  submitted: boolean
}

export default function StepComplete({ submitted }: StepCompleteProps) {
  return (
    <div className="text-center">
      {submitted ? (
        <p className="text-green-600 font-semibold text-lg">
          Hvala! Diploma je generirana i spremna za preuzimanje.
        </p>
      ) : (
        <p className="font-semibold text-[#0057B7] text-lg">
          Kliknite &quot;Complete&quot; za generiranje diplome.
        </p>
      )}
    </div>
  )
  
}
