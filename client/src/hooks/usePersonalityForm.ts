'use client'
import { useState, useEffect } from 'react'

export default function usePersonalityForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [favoriteColor, setFavoriteColor] = useState('')
  const [socialSituation, setSocialSituation] = useState('')
  const [planFrequency, setPlanFrequency] = useState('')
  const [decisionStyle, setDecisionStyle] = useState('')
  const [routineImportance, setRoutineImportance] = useState('')

  const [validName, setValidName] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const [validConsent, setValidConsent] = useState(false)
  const [validFavoriteColor, setValidFavoriteColor] = useState(false)
  const [validSocialSituation, setValidSocialSituation] = useState(false)
  const [validPlanFrequency, setValidPlanFrequency] = useState(false)
  const [validDecisionStyle, setValidDecisionStyle] = useState(false)
  const [validRoutineImportance, setValidRoutineImportance] = useState(false)

  const [submitted, setSubmitted] = useState(false)

  useEffect(() => setValidName(name.trim().length > 0), [name])
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setValidEmail(emailRegex.test(email))
  }, [email])
  useEffect(() => setValidConsent(consent), [consent])
  useEffect(() => setValidFavoriteColor(favoriteColor !== ''), [favoriteColor])
  useEffect(() => setValidSocialSituation(socialSituation !== ''), [socialSituation])
  useEffect(() => setValidPlanFrequency(planFrequency !== ''), [planFrequency])
  useEffect(() => setValidDecisionStyle(decisionStyle !== ''), [decisionStyle])
  useEffect(() => setValidRoutineImportance(routineImportance !== ''), [routineImportance])

  return {
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
  }
}
