export interface IOutput {
    message_kk: string,
    message_en: string,
    message_ru: string,
    message: string,
    result: boolean
}

export interface IMainResponse {
    name: string,
    tariff: {
        descriptions: number,
        analyses: number
    },
    in_process: boolean,
    output: IOutput,
}

export interface IImage {
    image: string,
}

export interface ICard {
    article: string,
    name: string,
    images: Array<IImage>,
    type: string,
    status: string,
    status_color: string,
    type_id: number,
    id: number
}

export interface IProcessResponse {
    "card_dates": {
        "cards": ICard[],
        "date": string,
        "id": number
    }[],
    "output": IOutput
}

export interface IRequestPostCard {
    top_article: number,
    article: number,
    type_id: number
}

export interface IResponseCard {
    "card": {
        "type_id": number,
        "id": number
    },
    "output": {
        "message_en": string
        "message_kk": string,
        "message_ru": string,
        "result": boolean
    }
}

export interface IRequestStartAnalysis {
    "card_id": number
}

export interface IResponseStartAnalysis {
    "output": {
        "message_en": string
        "message_kk": string
        "message_ru": string
        "result": boolean
    }
}
export interface IRequestStartDescription {
    "card_id": number
}

export interface IResponseStartDescription {
    "output": {
        "message_en": string
        "message_kk": string
        "message_ru": string
        "result": boolean
    }
}

// Add this new interface for the card analysis response
export interface ICardAnalysisResponse {
  card: {
    article: string
    brand: string
    name: string
    images: Array<{
      image: string
    }>
    status_id: number
    type_id: number
    id: number
  }
  button: {
    text: string
    visible: boolean
  }
  output: any // Placeholder for IOutput until it is declared or imported
}

// Add this new interface for the card description response
export interface ICardDescriptionResponse {
  card: {
    article: string
    brand: string
    name: string
    images: Array<{
      image: string
    }>
    status_id: number
    type_id: number
    id: number
  }
  button: {
    text: string
    visible: boolean
  }
  output: {
    message_kk: string
    message_en: string
    message_ru: string
    message: string
    result: boolean
  }
}





// Placeholder declaration for ICardDate
type ICardDate = {}

// Add this new interface for the card analysis response
export interface ICardAnalysisResponse {
  card: {
    article: string
    brand: string
    name: string
    images: Array<{
      image: string
    }>
    status_id: number
    type_id: number
    id: number
  }
  button: {
    text: string
    visible: boolean
  }
  output: any // Placeholder for IOutput until it is declared or imported
}

// Add this new interface for the card description response
export interface ICardDescriptionResponse {
  card: {
    article: string
    brand: string
    name: string
    images: Array<{
      image: string
    }>
    status_id: number
    type_id: number
    id: number
  }
  button: {
    text: string
    visible: boolean
  }
  output: {
    message_kk: string
    message_en: string
    message_ru: string
    message: string
    result: boolean
  }
}



// Update the IProcessResponse interface to allow card_dates to be null
export interface IProcessResponse {
  card_dates: ICardDate[] | null
  output: {
    message_kk: string
    message_en: string
    message_ru: string
    message: string
    result: boolean
  }
}



// Add this new interface for the archive response
export interface IArchiveResponse {
  card_dates: IArchiveCardDate[]
  output: {
    message_kk: string
    message_en: string
    message_ru: string
    message: string
    result: boolean
  }
}

export interface IArchiveCardDate {
  cards: IArchiveCard[]
  date: string
  id: number
}

export interface IArchiveCard {
  article: string
  name: string
  images: Array<{
    image: string
  }>
  type: string
  status: string
  status_color: string
  badge_visible: boolean
  type_id: number
  id: number
}
