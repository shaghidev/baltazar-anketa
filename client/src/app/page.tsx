'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Stepper, { Step } from '../components/Stepper/Stepper'
import StepName from '../components/Stepper/StepName'
import StepEmail from '../components/Stepper/StepEmail'
import StepConsent from '../components/Stepper/StepConsent'
import StepPersonalityQuestions from '../components/Stepper/StepPersonalityQuestions'
import StepComplete from '../components/Stepper/StepComplete'
import { useGeneratePDF } from '../components/hooks/useGeneratePDF'
import { calculatePersonality } from '../components/hooks/calculatePersonality'
import { PersonalityType } from '../components/hooks/scoring'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

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

  const [personality, setPersonality] = useState<PersonalityType | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [showWhatsApp, setShowWhatsApp] = useState(false)

  const { generatePDF } = useGeneratePDF()
  const { width, height } = useWindowSize()

  useEffect(() => {
    if (submitted) {
      const audio = new Audio('/sounds/confetti-sound.mp3')
      audio.play().catch(() => {})
    }
  }, [submitted])

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

  const onStepChange = (step: number) => {
    if (step === 4) {
      if (!isStepValid(3)) {
        alert('Molimo odgovorite na sva pitanja prije nego nastavite.')
        return
      }
      const p = calculatePersonality({
        hobby,
        reactionToNotKnowing,
        helpingBehavior,
        inventionIdea,
      })
      setPersonality(p)
      setSubmitted(true)
      setShowWhatsApp(true)
    } else {
      setShowWhatsApp(false)
      setSubmitted(false)
    }
    setCurrentStep(step)
    window.scrollTo(0, 0)
  }

  async function sendDataToBackend(data: { name: string; email: string; consent: boolean }) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
    

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorMessage = `Greška ${response.status}`;
        if (contentType?.includes("application/json")) {
          const { error } = await response.json();
          errorMessage = error || errorMessage;
        } else {
          const text = await response.text();
          if (text) errorMessage = text;
        }
        throw new Error(errorMessage);
      }

      return await response.json()
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Greška:', error.message)
        throw error
      } else {
        console.error('Nepoznata greška:', error)
        throw new Error('Nepoznata greška')
      }
    }
  }

  const handleFinalStepComplete = async () => {
    if (!isStepValid(3)) {
      alert('Molimo odgovorite na sva pitanja prije dovršetka.')
      return
    }

    if (!name.trim() || !email.trim() || !consent) {
      alert('Molimo popunite ime, email i označite dopuštenje.')
      return
    }

    const p = calculatePersonality({
      hobby,
      reactionToNotKnowing,
      helpingBehavior,
      inventionIdea,
    })

    setPersonality(p)
    setSubmitted(true)
    setShowWhatsApp(true)
    generatePDF(name, `${p.name}\n\n${p.description}`)

    try {
      const result = await sendDataToBackend({ name, email, consent })
      console.log('Backend je odgovorio:', result)
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert('Došlo je do problema sa slanjem podataka: ' + error.message)
      } else {
        alert('Došlo je do neočekivane greške')
      }
    }
  }

  return (
    <main className="flex items-center justify-center font-baltazar px-2 sm:px-6 py-8 min-h-screen w-full relative">
      {submitted && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          style={{ zIndex: 999999, position: 'fixed', top: 20, left: 0 }}
        />
      )}

      <div className="relative bg-[url('/images/background1.png')] bg-cover bg-center rounded-3xl shadow-xl w-full max-w-[95vw] sm:max-w-[700px] md:max-w-[900px] lg:max-w-[1200px] p-4 sm:p-8 overflow-hidden z-10">
        <div className="absolute inset-0 bg-yellow/40 rounded-3xl pointer-events-none" />

        <h1 className="relative text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-8 text-center text-[#0057B7] tracking-wide z-20">
          {currentStep === 4
            ? 'Tvoja supermoć iz Baltazargrada je '
            : 'Koja je tvoja supermoć iz Baltazargrada?'}
        </h1>

        <div className="flex justify-center mb-3 z-20">
          <Image
            src={baltazarImages[currentStep - 1]}
            alt={`Profesor Baltazar - Step ${currentStep}`}
            width={150}
            height={150}
            className="select-none"
          />
        </div>

        <Stepper
          initialStep={1}
          onStepChange={onStepChange}
          onFinalStepCompleted={handleFinalStepComplete}
          backButtonText="Nazad"
          nextButtonText="Dalje"
          className="relative space-y-8 sm:space-y-12 z-20"
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
            />
          </Step>

          <Step>
            <StepComplete
              personality={personality}
              submitted={submitted}
              name={name}
              showWhatsApp={showWhatsApp}
            />
          </Step>
        </Stepper>
      </div>
    </main>
  )
}
