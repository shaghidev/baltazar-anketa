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

}: Props) {
  const renderQuestion = (
    title: string,
    name: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    options: { label: string; value: string }[]
  ) => (
    <fieldset className="mb-12">
      <legend className="text-2xl font-extrabold mb-6 text-[#0057B7] drop-shadow-md">
        {title}
      </legend>
      <div className="grid gap-5 sm:grid-cols-2">
        {options.map(({ label, value: optionValue }) => (
          <label
            key={optionValue}
            className={`
              flex items-center p-3 rounded-3xl border- cursor-pointer select-none
              transition-all duration-300 ease-in-out
              shadow-sm
              ${
                value === optionValue
                  ? 'bg-yellow-100 border-yellow-400 scale-[1.01] shadow-lg'
                  : 'bg-white border-gray-300 hover:border-yellow-400 hover:shadow-md hover:scale-[1.01]'
              }
            `}
          >
            <input
              type="radio"
              name={name}
              value={optionValue}
              checked={value === optionValue}
              onChange={() => setValue(optionValue)}
              className="hidden"
            />
            <span className="text-3px font-medium text-gray-800">{label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )

  return (
    <div className="p-0 mx-auto">


      {renderQuestion(
        '1. Što ti najviše voliš raditi u slobodno vrijeme?',
        'hobby',
        hobby,
        setHobby,
        [
          { label: 'Čitati knjige i učiti nove stvari', value: 'knowledge' },
          { label: 'Pomoći prijatelju koji je tužan ili treba pomoć', value: 'kindness' },
          { label: 'Osmisliti neki novi crtež, priču ili izum', value: 'creativity' },
          { label: 'Istraživati i postavljati pitanja o svijetu oko sebe', value: 'curiosity' },
        ]
      )}

      {renderQuestion(
        '2. Kako se osjećaš kad nešto ne znaš?',
        'reactionToNotKnowing',
        reactionToNotKnowing,
        setReactionToNotKnowing,
        [
          { label: 'Odmah krećem istraživati samostalno', value: 'knowledge' },
          { label: 'Tražim nekoga tko mi može pomoći ili objasniti', value: 'kindness' },
          { label: 'Razmišljam kako bih mogao to riješiti na drugačiji, originalan način', value: 'creativity' },
          { label: 'Pitam mnogo pitanja kako bih zaključio odgovor', value: 'curiosity' },
        ]
      )}

      {renderQuestion(
        '3. Kada prijatelj ima problem ili izazov i tužan je, što najčešće napraviš? ',
        'helpingBehavior',
        helpingBehavior,
        setHelpingBehavior,
        [
          { label: 'Pokušam saznati što mu je potrebno da mu pomognem', value: 'knowledge' },
          { label: 'Pružim mu prijateljsku riječ ili zagrljaj', value: 'kindness' },
          { label: 'Pokušam ga nasmijati', value: 'creativity' },
          { label: 'Pitam zašto se to dogodilo i želim spriječiti da se ponovi', value: 'curiosity' },
        ]
      )}

      {renderQuestion(
        '4. Kad bi mogao/la izumiti nešto za Baltazargrad, što bi napravio/la?',
        'inventionIdea',
        inventionIdea,
        setInventionIdea,
        [
          { label: 'Uređaj koji pomaže svima da brzo nauče nove stvari', value: 'knowledge' },
          { label: 'Stroj koji širi radost i prijateljstvo među ljudima', value: 'kindness' },
          { label: 'Maštoviti robot koji pomaže ljudima da se izraze kreativno', value: 'creativity' },
          { label: 'Alat koji otkriva nove nepoznate stvari u prirodi i svemiru', value: 'curiosity' },
        ]
      )}
    </div>
  )
}
