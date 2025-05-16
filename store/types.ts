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