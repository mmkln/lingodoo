export interface UserWordData {
    wordId: number;
    nextReviewDate: Date;
    reviewCount: number;
}

export enum LanguageCode {
    EN = 'en',
    HU = 'hu',
}

export type UserDaysCount = {
    [key in LanguageCode]?: UserDaysCountData;
};

interface UserDaysCountData {
    count: number;
    date: Date;
}

export interface AppLanguage {
    name: string;
    code: LanguageCode;
}
