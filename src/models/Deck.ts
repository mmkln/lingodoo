export interface Deck {
    id: number;
    name: string;
    toReview: number;
    total: number;
    words: DeckWord[];
    lastUpdated: Date;
}

export interface DeckWord {
    id: number;
    word: string;
    translation: string;
    example: string;
    exampleTranslation?: string;
    explanation?: string
    nextReviewDate: Date;
    interval: number;
    repetitionCount: number;
}
