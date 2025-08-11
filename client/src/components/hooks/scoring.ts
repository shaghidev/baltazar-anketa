// scoring.ts
export type PersonalityType =
  | 'Profesor Baltazar'
  | 'Izumitelj Amater'
  | 'Umjetnik Sanjar'
  | 'Pomoćnik iz sjene';

export type FavoriteColor =
  | 'mjehuricomat'
  | 'vremenski_cajnik'
  | 'kisobran_bez_kise'
  | 'leteci_bicikl';

export type SocialSituation =
  | 'nova_naprava'
  | 'pitam_susjede'
  | 'isprobam'
  | 'planiram';

export type PlanFrequency =
  | 'baltazar_plava'
  | 'cvjetna_zelena'
  | 'suncano_zuta'
  | 'ljubicasta_fantazija';

export type DecisionStyle =
  | 'profesor_baltazar'
  | 'izumitelj_amater'
  | 'umjetnik_sanjar'
  | 'pomocnik_iz_sjene';

export type RoutineImportance =
  | 'nova_iznenadjenja'
  | 'pomaganje'
  | 'skupljanje_predmeta'
  | 'mirne_setnje';

export type Answers = {
  favoriteColor: FavoriteColor;
  socialSituation: SocialSituation;
  planFrequency: PlanFrequency;
  decisionStyle: DecisionStyle;
  routineImportance: RoutineImportance;
};

export type Scoring = {
  [K in keyof Answers]: {
    [answer: string]: Partial<Record<PersonalityType, number>>;
  };
};

export const scoring: Scoring = {
  favoriteColor: {
    mjehuricomat: { 'Profesor Baltazar': 2, 'Izumitelj Amater': 1, 'Umjetnik Sanjar': 0, 'Pomoćnik iz sjene': 0 },
    vremenski_cajnik: { 'Profesor Baltazar': 1, 'Izumitelj Amater': 2, 'Umjetnik Sanjar': 0, 'Pomoćnik iz sjene': 0 },
    kisobran_bez_kise: { 'Profesor Baltazar': 0, 'Izumitelj Amater': 0, 'Umjetnik Sanjar': 2, 'Pomoćnik iz sjene': 1 },
    leteci_bicikl: { 'Profesor Baltazar': 0, 'Izumitelj Amater': 1, 'Umjetnik Sanjar': 1, 'Pomoćnik iz sjene': 2 },
  },
  socialSituation: {
    nova_naprava: { 'Profesor Baltazar': 2, 'Izumitelj Amater': 2, 'Umjetnik Sanjar': 0, 'Pomoćnik iz sjene': 0 },
    pitam_susjede: { 'Profesor Baltazar': 0, 'Izumitelj Amater': 0, 'Umjetnik Sanjar': 1, 'Pomoćnik iz sjene': 2 },
    isprobam: { 'Profesor Baltazar': 1, 'Izumitelj Amater': 2, 'Umjetnik Sanjar': 1, 'Pomoćnik iz sjene': 0 },
    planiram: { 'Profesor Baltazar': 2, 'Izumitelj Amater': 0, 'Umjetnik Sanjar': 0, 'Pomoćnik iz sjene': 2 },
  },
  planFrequency: {
    baltazar_plava: { 'Profesor Baltazar': 2, 'Izumitelj Amater': 0, 'Umjetnik Sanjar': 1, 'Pomoćnik iz sjene': 1 },
    cvjetna_zelena: { 'Profesor Baltazar': 0, 'Izumitelj Amater': 1, 'Umjetnik Sanjar': 2, 'Pomoćnik iz sjene': 0 },
    suncano_zuta: { 'Profesor Baltazar': 1, 'Izumitelj Amater': 2, 'Umjetnik Sanjar': 0, 'Pomoćnik iz sjene': 1 },
    ljubicasta_fantazija: { 'Profesor Baltazar': 0, 'Izumitelj Amater': 1, 'Umjetnik Sanjar': 2, 'Pomoćnik iz sjene': 1 },
  },
  decisionStyle: {
    profesor_baltazar: { 'Profesor Baltazar': 3, 'Izumitelj Amater': 0, 'Umjetnik Sanjar': 0, 'Pomoćnik iz sjene': 1 },
    izumitelj_amater: { 'Profesor Baltazar': 0, 'Izumitelj Amater': 3, 'Umjetnik Sanjar': 1, 'Pomoćnik iz sjene': 0 },
    umjetnik_sanjar: { 'Profesor Baltazar': 0, 'Izumitelj Amater': 1, 'Umjetnik Sanjar': 3, 'Pomoćnik iz sjene': 0 },
    pomocnik_iz_sjene: { 'Profesor Baltazar': 1, 'Izumitelj Amater': 0, 'Umjetnik Sanjar': 0, 'Pomoćnik iz sjene': 3 },
  },
  routineImportance: {
    nova_iznenadjenja: { 'Profesor Baltazar': 0, 'Izumitelj Amater': 2, 'Umjetnik Sanjar': 1, 'Pomoćnik iz sjene': 0 },
    pomaganje: { 'Profesor Baltazar': 2, 'Izumitelj Amater': 0, 'Umjetnik Sanjar': 0, 'Pomoćnik iz sjene': 2 },
    skupljanje_predmeta: { 'Profesor Baltazar': 1, 'Izumitelj Amater': 0, 'Umjetnik Sanjar': 2, 'Pomoćnik iz sjene': 0 },
    mirne_setnje: { 'Profesor Baltazar': 0, 'Izumitelj Amater': 0, 'Umjetnik Sanjar': 0, 'Pomoćnik iz sjene': 3 },
  },
};
