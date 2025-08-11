'use client'

import React from 'react'
import Stepper, { Step } from '../components/Stepper/Stepper'
import StepName from '../components/Stepper/StepName'
import StepEmail from '../components/Stepper/StepEmail'
import StepConsent from '../components/Stepper/StepConsent'
import StepPersonalityQuestions, {
  FavoriteColor,
  SocialSituation,
  PlanFrequency,
  DecisionStyle,
  RoutineImportance,
} from '../components/Stepper/StepPersonalityQuestions'
import StepComplete from '../components/Stepper/StepComplete'

import usePersonalityForm from '../components/hooks/usePersonalityForm'
import { PersonalityType, Answers, scoring } from '../components/hooks/scoring'
import { useGeneratePDF } from '../components/hooks/useGeneratePDF'

type Scoring = typeof scoring;

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
  } = usePersonalityForm();

  const { generatePDF } = useGeneratePDF();

  const [currentStep, setCurrentStep] = React.useState(1);

  // Funkcija za izračun osobnosti na temelju bodova
  const calculatePersonality = (): PersonalityType => {
    // Prvo validiraj da su svi odgovori popunjeni
    if (
      favoriteColor === '' ||
      socialSituation === '' ||
      planFrequency === '' ||
      decisionStyle === '' ||
      routineImportance === ''
    ) {
      throw new Error('Nisu svi odgovori popunjeni');
    }

    const totals: Record<PersonalityType, number> = {
      'Profesor Baltazar': 0,
      'Izumitelj Amater': 0,
      'Umjetnik Sanjar': 0,
      'Pomoćnik iz sjene': 0,
    };

    const answers: Answers = {
      favoriteColor,
      socialSituation,
      planFrequency,
      decisionStyle,
      routineImportance,
    };

    // Scoring tip
    const scoringTyped = scoring as Scoring;

    (Object.keys(answers) as (keyof Answers)[]).forEach(key => {
      const answer = answers[key];
      const scoreMap = scoringTyped[key];
      if (!scoreMap) return;
      const scores = scoreMap[answer];
      if (scores) {
        for (const type in scores) {
          totals[type as PersonalityType] += scores[type as PersonalityType] ?? 0;
        }
      }
    });

    // Nađi osobnost s najvišim rezultatom
    return Object.entries(totals).reduce((max, curr) =>
      curr[1] > max[1] ? curr : max
    )[0] as PersonalityType;
  };

  const handleFinalStepComplete = () => {
    if (!validName) return alert('Unesite ime.');
    if (!validEmail) return alert('Unesite ispravan email.');
    if (!validConsent) return alert('Morate prihvatiti GDPR uvjete.');
    if (!validFavoriteColor) return alert('Molimo odaberite omiljenu boju.');
    if (!validSocialSituation) return alert('Odaberite kako se osjećate u društvenim situacijama.');
    if (!validPlanFrequency) return alert('Odaberite koliko često planirate aktivnosti.');
    if (!validDecisionStyle) return alert('Odaberite stil donošenja odluka.');
    if (!validRoutineImportance) return alert('Odaberite važnost rutine.');

    try {
      const personality = calculatePersonality();
      generatePDF(name, personality);
      setSubmitted(true);
    } catch {
      alert('Nisu svi odgovori popunjeni.');
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1: return validName;
      case 2: return validEmail && validConsent;
      case 3: return validFavoriteColor && validSocialSituation && validPlanFrequency && validDecisionStyle && validRoutineImportance;
      default: return true;
    }
  };

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
              q1={favoriteColor} setQ1={setFavoriteColor}
              q2={socialSituation} setQ2={setSocialSituation}
              q3={planFrequency} setQ3={setPlanFrequency}
              q4={decisionStyle} setQ4={setDecisionStyle}
              q5={routineImportance} setQ5={setRoutineImportance}
              validations={{
                validQ1: validFavoriteColor,
                validQ2: validSocialSituation,
                validQ3: validPlanFrequency,
                validQ4: validDecisionStyle,
                validQ5: validRoutineImportance,
              }}
            />
          </Step>
  
          <Step>
            <StepComplete submitted={submitted} />
          </Step>
        </Stepper>
      </div>
    </main>
  );
  }