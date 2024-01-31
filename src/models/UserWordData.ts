export interface UserWordData {
    wordId: number;
    nextReviewDate: Date;
    reviewCount: number;
}

export enum LanguageCode {
    EN = 'en',
    HU = 'hu',
}

export interface AppLanguage {
    name: string;
    code: LanguageCode;
}
