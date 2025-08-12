import { Answers, PersonalityType, scoring } from '../components/hooks/scoring'

export function calculatePersonality(answers: Answers): PersonalityType {
  const totals: Record<PersonalityType, number> = {
    'Profesor Baltazar': 0,
    'Izumitelj Amater': 0,
    'Umjetnik Sanjar': 0,
    'Pomoćnik iz sjene': 0,
  }

  for (const key in answers) {
    const scoreMap = scoring[key as keyof Answers]
    if (!scoreMap) continue
    const scores = scoreMap[answers[key as keyof Answers]]
    if (scores) {
      for (const type in scores) {
        totals[type as PersonalityType] += scores[type as PersonalityType] ?? 0
      }
    }
  }

  return Object.entries(totals).reduce((max, curr) =>
    curr[1] > max[1] ? curr : max
  )[0] as PersonalityType
}
