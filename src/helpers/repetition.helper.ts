import { DeckWord } from '../models';

export const initializeWord = (wordData: Omit<DeckWord, 'nextReviewDate' | 'interval' | 'repetitionCount'>): DeckWord => {
  return {
    ...wordData,
    nextReviewDate: new Date(),
    interval: 1,
    repetitionCount: 0,
  };
};

export const updateWordData = (wordData: DeckWord, success: boolean): DeckWord => {
  if (success) {
    const newInterval = wordData.interval * 2;
    return {
      ...wordData,
      nextReviewDate: new Date(Date.now() + newInterval * 24 * 60 * 60 * 1000),
      interval: newInterval,
      repetitionCount: wordData.repetitionCount + 1,
    };
  } else {
    return {
      ...wordData,
      nextReviewDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      interval: 1,
      repetitionCount: wordData.repetitionCount,
    };
  }
};

export const wordsToReview = (deckWords: DeckWord[]): DeckWord[] => {
  const today = new Date();
  return deckWords.filter(word => new Date(word.nextReviewDate) <= today);
};
