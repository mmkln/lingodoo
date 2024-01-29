export interface WordData {
    id: number;
    word: string;
    translation: string;
    example: string;
    nextReviewDate: Date;
    reviewCount: number;
}

export interface Word {
    id: number;
    word: string;
    translation: string;
    example: string;
}
