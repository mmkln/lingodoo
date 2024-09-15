import { DeckWord } from '../models';
import { REPETITION_INTERVALS_IN_MS } from '../constants';

export const initializeWord = (
  wordData: Omit<DeckWord, 'nextReviewDate' | 'interval' | 'repetitionCount'>
): DeckWord => {
  return {
    ...wordData,
    nextReviewDate: new Date(),
    interval: 1,
    repetitionCount: 0,
  };
};

export const updateWordData = (
  wordData: DeckWord,
  success: boolean
): DeckWord => {
  if (success) {
    return {
      ...wordData,
      nextReviewDate: new Date(
        Date.now() + REPETITION_INTERVALS_IN_MS[wordData.interval]
      ),
      interval: wordData.interval + 1,
      repetitionCount: wordData.repetitionCount + 1,
    };
  } else {
    return {
      ...wordData,
      nextReviewDate: new Date(Date.now() + REPETITION_INTERVALS_IN_MS[0]),
      interval: 1,
    };
  }
};

export const wordsToReview = (deckWords: DeckWord[]): DeckWord[] => {
  const today = new Date();
  return deckWords.filter((word) => new Date(word.nextReviewDate) <= today);
};
