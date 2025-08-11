'use client'

import React from 'react'
import Stepper, { Step } from '../components/Stepper/Stepper'
import StepName from '../components/StepName'
import StepEmail from '../components/StepEmail'
import StepConsent from '../components/StepConsent'
import StepPersonalityQuestions from '../components/StepPersonalityQuestions'
import StepComplete from '../components/StepComplete'

import usePersonalityForm from '../hooks/usePersonalityForm'
import { useGeneratePDF } from '../hooks/useGeneratePDF'

export default function Home() {
  const {
    name, setName,
    email, setEmail,
    consent, setConsent,
    favoriteColor, setFavoriteColor,
    socialSituation, setSocialSituation,
    planFrequency, setPlanFrequency,
    decisionStyle, setDecisionStyle,
    routineImportance, setRoutineImportance,
    validName,
    validEmail,
    validConsent,
    validFavoriteColor,
    validSocialSituation,
    validPlanFrequency,
    validDecisionStyle,
    validRoutineImportance,
    submitted, setSubmitted,
  } = usePersonalityForm()

  const { generatePDF } = useGeneratePDF()
  const [currentStep, setCurrentStep] = React.useState(1)

  const calculatePersonality = () => 'Ekstrovert'

  const handleFinalStepComplete = () => {
    if (!validName) return alert('Unesite ime.')
    if (!validEmail) return alert('Unesite ispravan email.')
    if (!validConsent) return alert('Morate prihvatiti GDPR uvjete.')
    if (!validFavoriteColor) return alert('Molimo odaberite omiljenu boju.')
    if (!validSocialSituation) return alert('Odaberite kako se osjećate u društvenim situacijama.')
    if (!validPlanFrequency) return alert('Odaberite koliko često planirate aktivnosti.')
    if (!validDecisionStyle) return alert('Odaberite stil donošenja odluka.')
    if (!validRoutineImportance) return alert('Odaberite važnost rutine.')

    generatePDF(name, calculatePersonality())
    setSubmitted(true)
  }

  function isStepValid(step: number) {
    switch (step) {
      case 1:
        return validName
      case 2:
        return validEmail && validConsent
      case 3:
        return (
          validFavoriteColor &&
          validSocialSituation &&
          validPlanFrequency &&
          validDecisionStyle &&
          validRoutineImportance
        )
      default:
        return true
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-baltazarPurple font-baltazar p-2 sm:p-6">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 sm:mb-12 text-center text-[#0057B7] tracking-wide">
          Anketa osobnosti
        </h1>

        <Stepper
          initialStep={1}
          onStepChange={setCurrentStep}
          onFinalStepCompleted={handleFinalStepComplete}
          backButtonText="Nazad"
          nextButtonText="Dalje"
          className="space-y-10 sm:space-y-14"
          disableNext={!isStepValid(currentStep)}
        >
          <Step>
            <StepName name={name} setName={setName} valid={validName} />
          </Step>

          <Step>
            <StepEmail email={email} setEmail={setEmail} valid={validEmail} />
            <StepConsent consent={consent} setConsent={setConsent} valid={validConsent} />
          </Step>

          <Step>
            <StepPersonalityQuestions
              favoriteColor={favoriteColor} setFavoriteColor={setFavoriteColor}
              socialSituation={socialSituation} setSocialSituation={setSocialSituation}
              planFrequency={planFrequency} setPlanFrequency={setPlanFrequency}
              decisionStyle={decisionStyle} setDecisionStyle={setDecisionStyle}
              routineImportance={routineImportance} setRoutineImportance={setRoutineImportance}
              validations={{
                validName,
                validEmail,
                validConsent,
                validFavoriteColor,
                validSocialSituation,
                validPlanFrequency,
                validDecisionStyle,
                validRoutineImportance,
              }}
            />
          </Step>

          <Step>
            <StepComplete submitted={submitted} />
          </Step>
        </Stepper>
      </div>
    </main>
  )
}
