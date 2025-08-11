'use client'
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

  // Izračun osobnosti (možeš proširiti)
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

    generatePDF(name, email, calculatePersonality())
    setSubmitted(true)
  }

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
