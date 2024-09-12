import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DeckWord } from '../models';
import {
  getLocalStorageItem,
  setLocalStorageItem,
  updateWordData,
  wordsToReview,
} from '../helpers';
import { LS_KEYS } from '../constants';
import { FlipCard } from '../components';

const ReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [deckWords, setDeckWords] = useState<DeckWord[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const storedDecks = getLocalStorageItem<any[]>(LS_KEYS.decks) || [];
    const deck = storedDecks.find((d: { id: number }) => d.id === Number(id));
    if (deck) {
      const words = wordsToReview(deck.words);
      setDeckWords(words);
    }
  }, [id]);

  const handleNextCard = (known: boolean) => {
    const updatedWord = updateWordData(deckWords[currentWordIndex], known);
    const newDeckWords = [...deckWords];
    newDeckWords[currentWordIndex] = updatedWord;

    const storedDecks = getLocalStorageItem<any[]>(LS_KEYS.decks) || [];
    const deckIndex = storedDecks.findIndex(
      (d: { id: number }) => d.id === Number(id)
    );
    if (deckIndex !== -1) {
      storedDecks[deckIndex].words = storedDecks[deckIndex].words.map(
        (word: DeckWord) => (word.id === updatedWord.id ? updatedWord : word)
      );
      setLocalStorageItem(LS_KEYS.decks, storedDecks);
    }

    const nextIndex = currentWordIndex + 1;
    if (nextIndex < deckWords.length) {
      setCurrentWordIndex(nextIndex);
    } else {
      navigate(`/deck/${id}`);
    }
  };

  if (deckWords.length === 0) {
    return <div>Loading...</div>;
  }

  const currentWord = deckWords[currentWordIndex];

  return (
    <div className="container mx-auto p-4">
      <header className="mb-40 md:mb-4 w-full">
        <button
          type="button"
          onClick={() => navigate(`/deck/${id}`)}
          className="flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
        >
          <svg
            className="w-5 h-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          <span>Go back</span>
        </button>
      </header>

      <div className="flex justify-center items-center h-full">
        <FlipCard data={currentWord} />
      </div>

      <div className="flex justify-center mt-32 md:mb-10">
        <div className="w-[26rem] flex justify-around">
          <button
            onClick={() => handleNextCard(false)}
            className="flex items-center justify-center px-4 py-4 text-sm text-white transition-colors duration-200 bg-red-500 rounded-lg hover:bg-red-600"
          >
            <svg
              className="w-16 h-16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <button
            onClick={() => handleNextCard(true)}
            className="flex items-center justify-center px-4 py-4 text-sm text-white transition-colors duration-200 bg-green-500 rounded-lg hover:bg-green-600"
          >
            <svg
              className="w-16 h-16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
