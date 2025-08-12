'use client'

import React from 'react'

interface Props {
  hobby: string
  setHobby: React.Dispatch<React.SetStateAction<string>>
  reactionToNotKnowing: string
  setReactionToNotKnowing: React.Dispatch<React.SetStateAction<string>>
  helpingBehavior: string
  setHelpingBehavior: React.Dispatch<React.SetStateAction<string>>
  inventionIdea: string
  setInventionIdea: React.Dispatch<React.SetStateAction<string>>
  routineImportance: string
  setRoutineImportance: React.Dispatch<React.SetStateAction<string>>
}

export default function StepPersonalityQuestions({
  hobby,
  setHobby,
  reactionToNotKnowing,
  setReactionToNotKnowing,
  helpingBehavior,
  setHelpingBehavior,
  inventionIdea,
  setInventionIdea,
  routineImportance,
  setRoutineImportance,
}: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Kviz: Koja je tvoja supermoć iz Baltazargrada?</h2>

      {/* Pitanje 1 */}
      <fieldset className="mb-6">
        <legend className="font-semibold mb-3">1. Što ti najviše voliš raditi u slobodno vrijeme?</legend>
        {[
          { label: 'Čitati knjige i učiti nove stvari', value: 'knowledge' },
          { label: 'Pomoći prijatelju koji je tužan ili treba pomoć', value: 'kindness' },
          { label: 'Osmisliti neki novi crtež, priču ili izum', value: 'creativity' },
          { label: 'Istraživati i postavljati pitanja o svijetu oko sebe', value: 'curiosity' },
        ].map(({ label, value }) => (
          <label key={value} className="block cursor-pointer mb-2">
            <input
              type="radio"
              name="hobby"
              value={value}
              checked={hobby === value}
              onChange={() => setHobby(value)}
              className="mr-2"
            />
            {label}
          </label>
        ))}
      </fieldset>

      {/* Pitanje 2 */}
      <fieldset className="mb-6">
        <legend className="font-semibold mb-3">2. Kako se osjećaš kad nešto ne znaš?</legend>
        {[
          { label: 'Želim odmah saznati kako to funkcionira', value: 'knowledge' },
          { label: 'Tražim nekoga tko mi može pomoći ili objasniti', value: 'kindness' },
          { label: 'Razmišljam kako bih mogao to riješiti na drugačiji, originalan način', value: 'creativity' },
          { label: 'Pitam mnogo pitanja i želim sve istražiti do kraja', value: 'curiosity' },
        ].map(({ label, value }) => (
          <label key={value} className="block cursor-pointer mb-2">
            <input
              type="radio"
              name="reactionToNotKnowing"
              value={value}
              checked={reactionToNotKnowing === value}
              onChange={() => setReactionToNotKnowing(value)}
              className="mr-2"
            />
            {label}
          </label>
        ))}
      </fieldset>

      {/* Pitanje 3 */}
      <fieldset className="mb-6">
        <legend className="font-semibold mb-3">3. Kada vidiš nekoga kako pati, što najčešće napraviš?</legend>
        {[
          { label: 'Pokušam naučiti što mu je potrebno da mu pomognem', value: 'knowledge' },
          { label: 'Pružim mu prijateljsku riječ ili zagrljaj', value: 'kindness' },
          { label: 'Osmislim zabavan način da mu popravim dan', value: 'creativity' },
          { label: 'Pitam zašto se to dogodilo i želim spriječiti da se ponovi', value: 'curiosity' },
        ].map(({ label, value }) => (
          <label key={value} className="block cursor-pointer mb-2">
            <input
              type="radio"
              name="helpingBehavior"
              value={value}
              checked={helpingBehavior === value}
              onChange={() => setHelpingBehavior(value)}
              className="mr-2"
            />
            {label}
          </label>
        ))}
      </fieldset>

      {/* Pitanje 4 */}
      <fieldset className="mb-6">
        <legend className="font-semibold mb-3">4. Kad bi mogao/la izumiti nešto za Baltazargrad, što bi napravio/la?</legend>
        {[
          { label: 'Uređaj koji pomaže svima da brzo nauče nove stvari', value: 'knowledge' },
          { label: 'Stroj koji širi radost i prijateljstvo među ljudima', value: 'kindness' },
          { label: 'Maštoviti robot koji pomaže ljudima da se izraze kreativno', value: 'creativity' },
          { label: 'Alat koji otkriva nove nepoznate stvari u prirodi i svemiru', value: 'curiosity' },
        ].map(({ label, value }) => (
          <label key={value} className="block cursor-pointer mb-2">
            <input
              type="radio"
              name="inventionIdea"
              value={value}
              checked={inventionIdea === value}
              onChange={() => setInventionIdea(value)}
              className="mr-2"
            />
            {label}
          </label>
        ))}
      </fieldset>


    </div>
  )
}
