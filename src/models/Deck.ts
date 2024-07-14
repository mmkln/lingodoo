export interface Deck {
    id: number;
    name: string;
    toReview: number;
    total: number;
    words: DeckWord[];
}

export interface DeckWord {
    id: number;
    word: string;
    translation: string;
}
