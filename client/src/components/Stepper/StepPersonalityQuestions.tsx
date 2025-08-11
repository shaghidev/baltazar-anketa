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
  const questionStyle =
    'w-full rounded-xl border-2 p-3 text-gray-900 transition focus:outline-none focus:ring-4 focus:ring-offset-1';

  return (
    <div className="flex flex-col gap-6">
      {/* Pitanje 1 */}
      <div className="flex flex-col gap-1">
        <label className="text-lg font-semibold text-[#0057B7]">
          Koja bi bila tvoja omiljena Baltazarova sprava?
        </label>
        <select
          value={q1}
          onChange={e => setQ1(e.target.value as FavoriteColor)}
          className={`${questionStyle} ${
            validations.validQ1
              ? 'border-[#0057B7] focus:ring-[#0057B7] focus:border-[#0057B7]'
              : 'border-red-500 focus:ring-red-400 focus:border-red-500'
          }`}
        >
          <option value="">Odaberite...</option>
          <option value="mjehuricomat">Mjehurić-o-mat</option>
          <option value="vremenski_cajnik">Vremenski čajnik</option>
          <option value="kisobran_bez_kise">Kišobran bez kiše</option>
          <option value="leteci_bicikl">Leteći bicikl</option>
        </select>
        {!validations.validQ1 && (
          <p className="text-red-600 text-sm italic">Molimo odaberite opciju.</p>
        )}
      </div>

      {/* Pitanje 2 */}
      <div className="flex flex-col gap-1">
        <label className="text-lg font-semibold text-[#0057B7]">
          Kako rješavaš probleme u Baltazargradu?
        </label>
        <select
          value={q2}
          onChange={e => setQ2(e.target.value as SocialSituation)}
          className={`${questionStyle} ${
            validations.validQ2
              ? 'border-[#0057B7] focus:ring-[#0057B7] focus:border-[#0057B7]'
              : 'border-red-500 focus:ring-red-400 focus:border-red-500'
          }`}
        >
          <option value="">Odaberite...</option>
          <option value="nova_naprava">Izmislim novu napravu</option>
          <option value="pitam_susjede">Pitam susjede za pomoć</option>
          <option value="isprobam">Isprobam dok ne uspije</option>
          <option value="planiram">Napravim plan i držim ga se</option>
        </select>
        {!validations.validQ2 && (
          <p className="text-red-600 text-sm italic">Molimo odaberite opciju.</p>
        )}
      </div>

      {/* Pitanje 3 */}
      <div className="flex flex-col gap-1">
        <label className="text-lg font-semibold text-[#0057B7]">
          Koja ti je omiljena boja u gradu?
        </label>
        <select
          value={q3}
          onChange={e => setQ3(e.target.value as PlanFrequency)}
          className={`${questionStyle} ${
            validations.validQ3
              ? 'border-[#0057B7] focus:ring-[#0057B7] focus:border-[#0057B7]'
              : 'border-red-500 focus:ring-red-400 focus:border-red-500'
          }`}
        >
          <option value="">Odaberite...</option>
          <option value="baltazar_plava">Baltazar plava</option>
          <option value="cvjetna_zelena">Cvjetna zelena</option>
          <option value="suncano_zuta">Sunčano žuta</option>
          <option value="ljubicasta_fantazija">Ljubičasta fantazija</option>
        </select>
        {!validations.validQ3 && (
          <p className="text-red-600 text-sm italic">Molimo odaberite opciju.</p>
        )}
      </div>

      {/* Pitanje 4 */}
      <div className="flex flex-col gap-1">
        <label className="text-lg font-semibold text-[#0057B7]">
          Kad bi bio lik iz crtića, bio bi:
        </label>
        <select
          value={q4}
          onChange={e => setQ4(e.target.value as DecisionStyle)}
          className={`${questionStyle} ${
            validations.validQ4
              ? 'border-[#0057B7] focus:ring-[#0057B7] focus:border-[#0057B7]'
              : 'border-red-500 focus:ring-red-400 focus:border-red-500'
          }`}
        >
          <option value="">Odaberite...</option>
          <option value="profesor_baltazar">Profesor Baltazar</option>
          <option value="izumitelj_amater">Izumitelj amater</option>
          <option value="umjetnik_sanjar">Umjetnik sanjar</option>
          <option value="pomocnik_iz_sjene">Pomoćnik iz sjene</option>
        </select>
        {!validations.validQ4 && (
          <p className="text-red-600 text-sm italic">Molimo odaberite opciju.</p>
        )}
      </div>

      {/* Pitanje 5 */}
      <div className="flex flex-col gap-1">
        <label className="text-lg font-semibold text-[#0057B7]">
          Što te najviše veseli u Baltazargradu?
        </label>
        <select
          value={q5}
          onChange={e => setQ5(e.target.value as RoutineImportance)}
          className={`${questionStyle} ${
            validations.validQ5
              ? 'border-[#0057B7] focus:ring-[#0057B7] focus:border-[#0057B7]'
              : 'border-red-500 focus:ring-red-400 focus:border-red-500'
          }`}
        >
          <option value="">Odaberite...</option>
          <option value="nova_iznenadjenja">Nova iznenađenja</option>
          <option value="pomaganje">Pomaganje drugima</option>
          <option value="skupljanje_predmeta">Skupljanje čudnih predmeta</option>
          <option value="mirne_setnje">Mirne šetnje parkom</option>
        </select>
        {!validations.validQ5 && (
          <p className="text-red-600 text-sm italic">Molimo odaberite opciju.</p>
        )}
      </div>
    </div>
  );
}
