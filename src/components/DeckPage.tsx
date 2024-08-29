import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WordItem } from '../components';
import { Deck, DeckWord } from '../models';
import {
    getLocalStorageItem,
    updateDeckToReviewCount,
} from '../helpers';
import { LS_KEYS } from '../constants';

const defaultDeckData: Deck = {
    id: 0,
    name: '',
    toReview: 0,
    total: 0,
    words: []
};

const DeckPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [deckName, setDeckName] = useState('');
    const [deckData, setDeckData] = useState<Deck | null>(null);
    const [deckWords, setDeckWords] = useState<DeckWord[]>([]);

    const handleBackClick = () => {
        navigate(`/`);
    };

    const handleAddClick = () => {
        navigate(`/new-word/${id}`);
    };

    const handleReviewClick = () => {
        navigate(`/review/${id}`);
    };

    useEffect(() => {

        const storedDecks: Deck[] = getLocalStorageItem<Deck[]>(LS_KEYS.decks) || [];
        const deck = storedDecks.find((d: { id: number }) => d.id === Number(id));
        if (deck) {
            setDeckName(deck.name);
            setDeckData(deck);
            setDeckWords(deck.words || []);
        }
        if (deck && 'words' in deck) {
            updateDeckToReviewCount(deck);
        }
    }, [id]);

    if (!deckData) {
        return <div>Loading...</div>;
    }

    return (
      <div className="container mx-auto p-4">
          <header className="flex justify-between items-center mb-4">
              <button
                type="button"
                onClick={() => handleBackClick()}
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
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                  </svg>
                  <span>Go back</span>
              </button>
              <button
                className="text-2xl bg-black text-white rounded-full w-10 h-10 flex items-center justify-center"
                onClick={handleAddClick}
              >
                  +
              </button>
          </header>

          <div className="mb-4 bg-white rounded-lg p-4 shadow flex justify-between items-center">
              <div>
                  <h2 className="text-lg font-bold">{deckData.name}</h2>
                  <div className="flex gap-4">
                    <span className={`rounded-md px-2 py-1 font-bold ${!deckData.toReview ? 'bg-green-300' : 'bg-yellow-300'}`}>
                      {deckData.toReview} to review
                    </span>
                    <span className="bg-blue-500 text-white rounded-md px-2 py-1 font-bold">{deckData.total} total</span>
                  </div>
              </div>
              <button className="text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                      <path
                        fillRule="evenodd"
                        d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                        clipRule="evenodd"
                      />
                  </svg>
              </button>
          </div>
          {!deckData.toReview ? (
            <div className="mb-4 text-2xl bg-green-300 text-center text-white rounded-md p-4">
                Nothing to review today
            </div>
          ) : (
            <button
              onClick={handleReviewClick}
              className="mb-4 text-2xl bg-yellow-500 text-white rounded-lg p-4 w-full flex items-center justify-center"
            >
                Review Cards
            </button>
          )}

          <main className="flex flex-col gap-4">
              {deckWords.map((word, index) => (
                <WordItem key={index} word={word.word} translation={word.translation} />
              ))}
          </main>
      </div>
    );
};

export default DeckPage;
