export type PersonalityType = {
    name: string
    description: string
  }
  
  export const PERSONALITY_TYPES: Record<string, PersonalityType> = {
    knowledge: {
      name: "Znanje 📚",
      description:
        "U Baltazargradu ti si kao enciklopedija na nogama! Uvijek spreman pronaći pravi podatak u pravo vrijeme. Tvoje znanje gradi mostove između ljudi i ideja, baš kao što Profesor Baltazar gradi svoje čudesne izume."
    },
    creativity: {
      name: "Kreativnost 🎨",
      description:
        "Tvoj um je šarena radionica ideja! U Baltazargradu si poznat po rješenjima koja nitko drugi ne bi ni pomislio. Kad ti staviš prst na bradu, svi znaju – slijedi nešto posebno i pomalo čarobno."
    },
    curiosity: {
      name: "Radoznalost 🔍",
      description:
        "Ti si neumorni istraživač Baltazargrada! Sve te zanima, svuda zaviriš i uvijek imaš još jedno pitanje. Tvoje ‘A što ako…?’ otvara vrata novim otkrićima i nevjerojatnim avanturama."
    }
  }
  