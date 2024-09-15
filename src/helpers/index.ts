export * from './localStorage.helper';
export * from './repetition.helper';
export * from './deckWords.helper';
export * from './is.helper';

export function hoursToMilliseconds(hours: number): number {
  return hours * 60 * 60 * 1000;
}
