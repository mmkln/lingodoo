import { Deck, DeckWord } from '../models';
import { getLocalStorageItem, setLocalStorageItem } from './localStorage.helper';
import { LS_KEYS } from '../constants';
import { initializeWord } from './repetition.helper';

interface WordItem {
  word: string;
  translation: string;
  example: string;
}

export const setWordsIntoDeck = (deckId: number, wordList: WordItem[]): void => {
  const storedDecks: Deck[] = getLocalStorageItem<any[]>(LS_KEYS.decks) || [];
  const deckIndex = storedDecks.findIndex((d: Deck) => d.id === Number(deckId));

  if (deckIndex !== -1) {

    wordList.map(({word, translation, example}) => {
      const newWord: DeckWord = initializeWord({
        id: storedDecks[deckIndex].words?.length ? storedDecks[deckIndex].words[storedDecks[deckIndex].words.length - 1].id + 1 : 1,
        word,
        translation,
        example
      });

      storedDecks[deckIndex].words.push(newWord);
      storedDecks[deckIndex].total += 1;
      storedDecks[deckIndex].toReview = calculateDeckToReviewCount(storedDecks[deckIndex]);
    })

    setLocalStorageItem(LS_KEYS.decks, storedDecks);
  }
}

export const setWordIntoDeck = (deckId: number | string, wordItem: WordItem): void => {
  const storedDecks: Deck[] = getLocalStorageItem<any[]>(LS_KEYS.decks) || [];
  const deckIndex = storedDecks.findIndex((d: Deck) => d.id === Number(deckId));

  if (deckIndex !== -1) {

    const { word, translation, example} = wordItem;
    const newWord: DeckWord = initializeWord({
      id: storedDecks[deckIndex].words?.length ? storedDecks[deckIndex].words[storedDecks[deckIndex].words.length - 1].id + 1 : 1,
      word,
      translation,
      example
    });

    storedDecks[deckIndex].words.push(newWord);
    storedDecks[deckIndex].total += 1;
    storedDecks[deckIndex].toReview = calculateDeckToReviewCount(storedDecks[deckIndex]);

    setLocalStorageItem(LS_KEYS.decks, storedDecks);
  }
}

export function initializeDeckWords(deckId: number, words: Array<{translation: string, word: string, example: string}>): void {
  const newWords = words.slice(0, 5);
  setWordsIntoDeck(deckId, newWords);
}

export function setNextDeckWords(deck: Deck, words: Array<{translation: string, word: string, example: string}>): void {
  if (deck.toReview == 0) {
    const newWords = words.slice(deck.total, deck.total + 5);
    setWordsIntoDeck(deck.id, newWords);
  }
}

export function calculateDeckToReviewCount(deck: Deck): number {
  return deck.words.filter(word => new Date(word.nextReviewDate) <= new Date()).length;
}

export function updateDeckToReviewCount(deck: Deck): void {
  const count = calculateDeckToReviewCount(deck);
  const storedDecks: Deck[] = getLocalStorageItem<any[]>(LS_KEYS.decks) || [];
  const deckIndex = storedDecks.findIndex((d: Deck) => d.id === Number(deck.id));

  if (deckIndex !== -1) {
    storedDecks[deckIndex].toReview = count;
    setLocalStorageItem(LS_KEYS.decks, storedDecks);
  }
}

export function setDeckToReviewCount(deckId: number, count: number): void {
  const storedDecks: Deck[] = getLocalStorageItem<any[]>(LS_KEYS.decks) || [];
  const deckIndex = storedDecks.findIndex((d: Deck) => d.id === Number(deckId));

  if (deckIndex !== -1) {
    storedDecks[deckIndex].toReview = count;

    setLocalStorageItem(LS_KEYS.decks, storedDecks);
  }
}
