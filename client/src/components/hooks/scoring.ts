export type PersonalityType = {
  key: string
  name: string
  description: string
  icon: string
  template: string
}

export const PERSONALITY_TYPES: Record<string, PersonalityType> = {
  knowledge: {
    key: "knowledge",
    name: "Znanje",
    icon: "📚",
    description: `
U Baltazargradu ti si kao enciklopedija na nogama! 
Uvijek spreman pronaći pravi podatak u pravo vrijeme. 
Tvoje znanje gradi mostove između ljudi i ideja, 
baš kao što Profesor Baltazar gradi svoje čudesne izume.
    `,
    template: "/templates/knowledge.pdf",
  },

  creativity: {
    key: "creativity",
    name: "Kreativnost",
    icon: "🎨",
    description: `
Tvoj um je šarena radionica ideja! 
U Baltazargradu si poznat po rješenjima koja nitko drugi ne bi ni pomislio. 
Kad ti staviš prst na bradu, svi znaju – slijedi nešto posebno i pomalo čarobno.
    `,
    template: "/templates/creativity.pdf",
  },

  curiosity: {
    key: "curiosity",
    name: "Radoznalost",
    icon: "🔍",
    description: `
Ti si neumorni istraživač Baltazargrada! 
Sve te zanima, svuda zaviriš i uvijek imaš još jedno pitanje. 
Tvoje ‘A što ako…?’ otvara vrata novim otkrićima i nevjerojatnim avanturama.
    `,
    template: "/templates/curiosity.pdf",
  },
}
