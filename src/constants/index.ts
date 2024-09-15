export * from './localStorageKeys';
export * from './WORDS_HP_HU';

export const ADD_WORDS_LIMIT = 5;
// 9 HOURS
export const ADD_WORDS_GAP = 9 * 60 * 60 * 1000;

// 9 HOURS
export const DEFAULT_REPETITION_GAP_IN_MS = 9 * 60 * 60 * 1000;
export const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

export const REPETITION_INTERVALS_IN_MS = [
  60 * 60 * 1000,
  9 * 60 * 60 * 1000,
  24 * 60 * 60 * 1000,
  2 * 24 * 60 * 60 * 1000,
  6 * 24 * 60 * 60 * 1000,
  30 * 24 * 60 * 60 * 1000,
]
