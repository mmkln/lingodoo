import { Deck, DeckWord } from '../models';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from './localStorage.helper';
import { ADD_WORDS_GAP, ADD_WORDS_LIMIT, LS_KEYS } from '../constants';
import { initializeWord } from './repetition.helper';

interface WordItem {
  word: string;
  translation: string;
  example: string;
  explanation?: string;
}

export const setWordsIntoDeck = (
  deckId: number,
  wordList: WordItem[]
): void => {
  const storedDecks: Deck[] = getLocalStorageItem<any[]>(LS_KEYS.decks) || [];
  const deckIndex = storedDecks.findIndex((d: Deck) => d.id === Number(deckId));

  if (deckIndex !== -1) {
    wordList.map(({ word, translation, example, explanation }) => {
      const newWord: DeckWord = initializeWord({
        id: storedDecks[deckIndex].words?.length
          ? storedDecks[deckIndex].words[
              storedDecks[deckIndex].words.length - 1
            ].id + 1
          : 1,
        word,
        translation,
        example,
        explanation,
      });

      storedDecks[deckIndex].words.push(newWord);
      storedDecks[deckIndex].total += 1;
      storedDecks[deckIndex].toReview = calculateDeckToReviewCount(
        storedDecks[deckIndex]
      );
    });

    setLocalStorageItem(LS_KEYS.decks, storedDecks);
  }
};

export const setWordIntoDeck = (
  deckId: number | string,
  wordItem: WordItem
): void => {
  const storedDecks: Deck[] = getLocalStorageItem<any[]>(LS_KEYS.decks) || [];
  const deckIndex = storedDecks.findIndex((d: Deck) => d.id === Number(deckId));

  if (deckIndex !== -1) {
    const { word, translation, example, explanation } = wordItem;
    const newWord: DeckWord = initializeWord({
      id: storedDecks[deckIndex].words?.length
        ? storedDecks[deckIndex].words[storedDecks[deckIndex].words.length - 1]
            .id + 1
        : 1,
      word,
      translation,
      example,
      explanation,
    });

    storedDecks[deckIndex].words.push(newWord);
    storedDecks[deckIndex].total += 1;
    storedDecks[deckIndex].toReview = calculateDeckToReviewCount(
      storedDecks[deckIndex]
    );

    setLocalStorageItem(LS_KEYS.decks, storedDecks);
  }
};

export function initializeDeckWords(
  deckId: number,
  words: Array<{ translation: string; word: string; example: string }>
): void {
  const newWords = words.slice(0, ADD_WORDS_LIMIT);
  setWordsIntoDeck(deckId, newWords);
}

export function setNextDeckWords(
  deck: Deck,
  words: Array<{ translation: string; word: string; example: string }>
): void {
  const currentTime = new Date();

  // Check if more than 24 hours have passed since the last update or if lastUpdated is null
  const lastUpdatedTime = deck.lastUpdated
    ? new Date(deck.lastUpdated).getTime()
    : 0; // If null, use 0 (epoch)
  const timeSinceLastUpdate = currentTime.getTime() - lastUpdatedTime;

  if (deck.toReview === 0 && timeSinceLastUpdate > ADD_WORDS_GAP) {
    const newWords = words.slice(deck.total, deck.total + ADD_WORDS_LIMIT);
    setWordsIntoDeck(deck.id, newWords);

    // Update the lastUpdated time to current time
    updateDeckLastUpdated(deck);
  }
}

export function calculateDeckToReviewCount(deck: Deck): number {
  return deck.words.filter(
    (word) => new Date(word.nextReviewDate) <= new Date()
  ).length;
}

export function updateDeckToReviewCount(deck: Deck): void {
  const count = calculateDeckToReviewCount(deck);
  const storedDecks: Deck[] = getLocalStorageItem<any[]>(LS_KEYS.decks) || [];
  const deckIndex = storedDecks.findIndex(
    (d: Deck) => d.id === Number(deck.id)
  );

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

export function updateDeckLastUpdated(deck: Deck): void {
  const currentTime = new Date();
  const storedDecks: Deck[] = getLocalStorageItem<Deck[]>(LS_KEYS.decks) || [];
  const deckIndex = storedDecks.findIndex(
    (d: Deck) => d.id === Number(deck.id)
  );

  if (deckIndex !== -1) {
    storedDecks[deckIndex].lastUpdated = currentTime;
    setLocalStorageItem(LS_KEYS.decks, storedDecks);
  }
}
