'use client'

import React, { useState } from 'react'
import Stepper, { Step } from '../components/Stepper/Stepper'
import StepName from '../components/Stepper/StepName'
import StepEmail from '../components/Stepper/StepEmail'
import StepConsent from '../components/Stepper/StepConsent'
import StepPersonalityQuestions from '../components/Stepper/StepPersonalityQuestions'
import StepComplete from '../components/Stepper/StepComplete'
import { useGeneratePDF } from '../components/hooks/useGeneratePDF'
import { calculatePersonality } from '../components/hooks/calculatePersonality'
import { PersonalityType } from '../components/hooks/scoring'

export default function Home() {
  const baltazarImages = [
    "/images/baltazar-step1.png",
    "/images/baltazar-step2.png",
    "/images/baltazar-step3.png",
    "/images/baltazar-step4.png",
  ]

  const [currentStep, setCurrentStep] = useState(1)

  // Podaci forme
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)

  const [hobby, setHobby] = useState('')
  const [reactionToNotKnowing, setReactionToNotKnowing] = useState('')
  const [helpingBehavior, setHelpingBehavior] = useState('')
  const [inventionIdea, setInventionIdea] = useState('')
  const [routineImportance, setRoutineImportance] = useState('')

  const [personality, setPersonality] = useState<PersonalityType | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const { generatePDF } = useGeneratePDF()

  // Validacija po koracima
  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return name.trim().length > 0
      case 2:
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && consent
      case 3:
        return (
          hobby !== '' &&
          reactionToNotKnowing !== '' &&
          helpingBehavior !== '' &&
          inventionIdea !== ''
        )
      default:
        return true
    }
  }

  // Na promjenu koraka samo postavi korak, bez generiranja PDF-a
  const onStepChange = (step: number) => {
    if (step < currentStep) {
      // dozvoli nazad bez uvjeta
      window.scrollTo(0, 0)  // skrolaj na vrh kad ide nazad

      setCurrentStep(step)
      return
    }
    // Spriječi prelazak na sljedeći korak ako nije validno
    if (!isStepValid(currentStep)) {
      alert('Molimo ispunite trenutni korak prije nego nastavite.')
      return
    }
    setCurrentStep(step)
    window.scrollTo(0, 0) // skrolaj na vrh kad ide naprijed

  }

  // Funkcija koja se poziva samo na zadnjem koraku kada korisnik klikne "Complete"
  const handleFinalStepComplete = () => {
    if (!isStepValid(3)) {
      alert('Molimo odgovorite na sva pitanja prije dovršetka.')
      return
    }
    const p = calculatePersonality({
      hobby,
      reactionToNotKnowing,
      helpingBehavior,
      inventionIdea,
      routineImportance,
    })
    setPersonality(p)
    setSubmitted(true)
    generatePDF(name, `${p.name}\n\n${p.description}`)
  }

  return (
    <main className="flex items-center justify-center font-baltazar px-2 sm:px-6 py-8 min-h-screen w-full">
      <div
        className="
          relative
          bg-[url('/images/background1.png')] bg-cover bg-center
          rounded-3xl shadow-xl
          w-full max-w-[95vw] sm:max-w-[700px] md:max-w-[900px] lg:max-w-[1200px]
          p-4 sm:p-8
          overflow-hidden
        "
      >
        <div className="absolute inset-0 bg-yellow/40 rounded-3xl pointer-events-none" />

        <h1 className="relative text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-8 text-center text-[#0057B7] tracking-wide">
          Koja je tvoja supermoć iz Baltazargrada?
        </h1>

        <div className="flex justify-center mb-3">
          <img
            src={baltazarImages[currentStep - 1]}
            alt={`Profesor Baltazar - Step ${currentStep}`}
            className="w-[150px] h-auto select-none"
          />
        </div>

        <Stepper
          initialStep={1}
          onStepChange={onStepChange}
          onFinalStepCompleted={handleFinalStepComplete}
          backButtonText="Nazad"
          nextButtonText={currentStep === 4 ? "Complete" : "Dalje"}
          className="relative space-y-8 sm:space-y-12"
          disableNext={!isStepValid(currentStep)}
        >
          <Step>
            <StepName name={name} setName={setName} valid={isStepValid(1)} />
          </Step>

          <Step>
            <StepEmail email={email} setEmail={setEmail} valid={/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)} />
            <StepConsent consent={consent} setConsent={setConsent} valid={consent} />
          </Step>

          <Step>
            <StepPersonalityQuestions
              hobby={hobby}
              setHobby={setHobby}
              reactionToNotKnowing={reactionToNotKnowing}
              setReactionToNotKnowing={setReactionToNotKnowing}
              helpingBehavior={helpingBehavior}
              setHelpingBehavior={setHelpingBehavior}
              inventionIdea={inventionIdea}
              setInventionIdea={setInventionIdea}
              routineImportance={routineImportance}
              setRoutineImportance={setRoutineImportance}
            />
          </Step>

          <Step>
            <StepComplete personality={personality} submitted={submitted} name={name} />
          </Step>
        </Stepper>
      </div>
    </main>
  )
}
