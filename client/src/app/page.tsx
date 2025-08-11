'use client'

import Stepper, { Step } from '../components/Stepper/Stepper'

import StepName from '../components/StepName'
import StepEmail from '../components/StepEmail'
import StepConsent from '../components/StepConsent'
import StepComplete from '../components/StepComplete'

import usePersonalityForm from '@/hooks/usePersonalityForm'

export default function Home() {
  const {
    name,
    setName,
    email,
    setEmail,
    consent,
    setConsent,
    submitted,
    validStep1,
    validStep2,
    validStep3,
    handleFinalStepComplete,
  } = usePersonalityForm()

  return (
    <main className="min-h-screen flex items-center justify-center bg-baltazarGray font-baltazar p-6">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-10">
        <h1 className="text-4xl font-extrabold mb-12 text-center text-[#0057B7] tracking-wide">
          Anketa osobnosti
        </h1>

        <Stepper
          initialStep={1}
          onFinalStepCompleted={handleFinalStepComplete}
          backButtonText="Nazad"
          nextButtonText="Dalje"
          className="space-y-14"
        >
          <Step><StepName name={name} setName={setName} valid={validStep1} /></Step>
          <Step><StepEmail email={email} setEmail={setEmail} valid={validStep2} /></Step>
          <Step><StepConsent consent={consent} setConsent={setConsent} valid={validStep3} /></Step>
          <Step><StepComplete submitted={submitted} /></Step>
        </Stepper>
      </div>
    </main>
  )
}
