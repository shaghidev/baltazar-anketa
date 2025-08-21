// client/src/components/hooks/calculatePersonality.ts
import { PersonalityType, PERSONALITY_TYPES } from "./scoring"

interface Answers {
  hobby: string
  reactionToNotKnowing: string
  helpingBehavior: string
  inventionIdea: string
}

export function calculatePersonality(answers: Answers): PersonalityType {
  // Brojač po tipu (samo postojeći tipovi)
  const tally: Record<string, number> = {
    knowledge: 0,
    creativity: 0,
    curiosity: 0,
  }

  // Zbrajamo po odgovoru, ignoriramo nepostojeće tipove
  const answerKeys = [answers.hobby, answers.reactionToNotKnowing, answers.helpingBehavior, answers.inventionIdea]
  answerKeys.forEach(key => {
    if (tally[key] !== undefined) {
      tally[key]++
    }
  })

  // Pronađi tip s najviše bodova
  let maxType = "knowledge"
  let maxCount = 0
  for (const [type, count] of Object.entries(tally)) {
    if (count > maxCount) {
      maxType = type
      maxCount = count
    }
  }

  // Vraćamo personality tip iz PERSONALITY_TYPES
  return PERSONALITY_TYPES[maxType] || PERSONALITY_TYPES["knowledge"]
}
