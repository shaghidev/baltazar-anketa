'use client'

import React, { Dispatch, SetStateAction } from 'react';

export type FavoriteColor =
  | 'mjehuricomat'
  | 'vremenski_cajnik'
  | 'kisobran_bez_kise'
  | 'leteci_bicikl'
  | ''; // dodaj prazan string kao validan početni state

export type SocialSituation =
  | 'nova_naprava'
  | 'pitam_susjede'
  | 'isprobam'
  | 'planiram'
  | '';

export type PlanFrequency =
  | 'baltazar_plava'
  | 'cvjetna_zelena'
  | 'suncano_zuta'
  | 'ljubicasta_fantazija'
  | '';

export type DecisionStyle =
  | 'profesor_baltazar'
  | 'izumitelj_amater'
  | 'umjetnik_sanjar'
  | 'pomocnik_iz_sjene'
  | '';

export type RoutineImportance =
  | 'nova_iznenadjenja'
  | 'pomaganje'
  | 'skupljanje_predmeta'
  | 'mirne_setnje'
  | '';

interface StepPersonalityQuestionsProps {
  q1: FavoriteColor;
  setQ1: Dispatch<SetStateAction<FavoriteColor>>;
  q2: SocialSituation;
  setQ2: Dispatch<SetStateAction<SocialSituation>>;
  q3: PlanFrequency;
  setQ3: Dispatch<SetStateAction<PlanFrequency>>;
  q4: DecisionStyle;
  setQ4: Dispatch<SetStateAction<DecisionStyle>>;
  q5: RoutineImportance;
  setQ5: Dispatch<SetStateAction<RoutineImportance>>;
  validations: {
    validQ1: boolean;
    validQ2: boolean;
    validQ3: boolean;
    validQ4: boolean;
    validQ5: boolean;
  };
}

export default function StepPersonalityQuestions({
  q1,
  setQ1,
  q2,
  setQ2,
  q3,
  setQ3,
  q4,
  setQ4,
  q5,
  setQ5,
  validations,
}: StepPersonalityQuestionsProps) {
  const optionClass = (selected: boolean) =>
    `min-w-[120px] sm:min-w-[140px] px-5 py-3 rounded-xl border-2 cursor-pointer select-none transition
    ${
      selected
        ? "border-[#0057B7] bg-[#cde5ff] shadow-md"
        : "border-gray-300 hover:border-[#0057B7] hover:bg-[#e6f0ff]"
    } focus:outline-none focus:ring-4 focus:ring-[#0057B7] focus:ring-offset-1`;

  return (
    <div className="flex flex-col gap-6">
      {/* Pitanje 1 */}
      <div className="flex flex-col gap-1">
        <label className="text-lg font-semibold text-[#0057B7]">
          Koja bi bila tvoja omiljena Baltazarova sprava?
        </label>
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          {[
            { value: "mjehuricomat", label: "Mjehurić-o-mat" },
            { value: "vremenski_cajnik", label: "Vremenski čajnik" },
            { value: "kisobran_bez_kise", label: "Kišobran bez kiše" },
            { value: "leteci_bicikl", label: "Leteći bicikl" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setQ1(option.value as FavoriteColor)}
              className={optionClass(q1 === option.value)}
              aria-pressed={q1 === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
        {!validations.validQ1 && (
          <p className="text-red-600 text-sm italic">Molimo odaberite opciju.</p>
        )}
      </div>

      {/* Pitanje 2 */}
      <div className="flex flex-col gap-1">
        <label className="text-lg font-semibold text-[#0057B7]">
          Kako rješavaš probleme u Baltazargradu?
        </label>
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          {[
            { value: "nova_naprava", label: "Izmislim novu napravu" },
            { value: "pitam_susjede", label: "Pitam susjede za pomoć" },
            { value: "isprobam", label: "Isprobam dok ne uspije" },
            { value: "planiram", label: "Napravim plan i držim ga se" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setQ2(option.value as SocialSituation)}
              className={optionClass(q2 === option.value)}
              aria-pressed={q2 === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
        {!validations.validQ2 && (
          <p className="text-red-600 text-sm italic">Molimo odaberite opciju.</p>
        )}
      </div>

      {/* Pitanje 3 */}
      <div className="flex flex-col gap-1">
        <label className="text-lg font-semibold text-[#0057B7]">
          Koja ti je omiljena boja u gradu?
        </label>
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          {[
            { value: "baltazar_plava", label: "Baltazar plava" },
            { value: "cvjetna_zelena", label: "Cvjetna zelena" },
            { value: "suncano_zuta", label: "Sunčano žuta" },
            { value: "ljubicasta_fantazija", label: "Ljubičasta fantazija" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setQ3(option.value as PlanFrequency)}
              className={optionClass(q3 === option.value)}
              aria-pressed={q3 === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
        {!validations.validQ3 && (
          <p className="text-red-600 text-sm italic">Molimo odaberite opciju.</p>
        )}
      </div>

      {/* Pitanje 4 */}
      <div className="flex flex-col gap-1">
        <label className="text-lg font-semibold text-[#0057B7]">
          Kad bi bio lik iz crtića, bio bi:
        </label>
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          {[
            { value: "profesor_baltazar", label: "Profesor Baltazar" },
            { value: "izumitelj_amater", label: "Izumitelj amater" },
            { value: "umjetnik_sanjar", label: "Umjetnik sanjar" },
            { value: "pomocnik_iz_sjene", label: "Pomoćnik iz sjene" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setQ4(option.value as DecisionStyle)}
              className={optionClass(q4 === option.value)}
              aria-pressed={q4 === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
        {!validations.validQ4 && (
          <p className="text-red-600 text-sm italic">Molimo odaberite opciju.</p>
        )}
      </div>

      {/* Pitanje 5 */}
      <div className="flex flex-col gap-1">
        <label className="text-lg font-semibold text-[#0057B7]">
          Što te najviše veseli u Baltazargradu?
        </label>
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          {[
            { value: "nova_iznenadjenja", label: "Nova iznenađenja" },
            { value: "pomaganje", label: "Pomaganje drugima" },
            { value: "skupljanje_predmeta", label: "Skupljanje čudnih predmeta" },
            { value: "mirne_setnje", label: "Mirne šetnje parkom" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setQ5(option.value as RoutineImportance)}
              className={optionClass(q5 === option.value)}
              aria-pressed={q5 === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
        {!validations.validQ5 && (
          <p className="text-red-600 text-sm italic">Molimo odaberite opciju.</p>
        )}
      </div>
    </div>
  );
}


