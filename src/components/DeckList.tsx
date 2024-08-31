import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {DeckItem, DeckModal} from '../components';
import {Deck} from "../models";
import { WORDS_HP_HU } from '../constants';
import { initializeDeckWords, setNextDeckWords } from '../helpers';

const DeckList: React.FC = () => {
    const [decks, setDecks] = useState<Deck[]>([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const storedDecks = JSON.parse(localStorage.getItem('decks') || '[]');
        setDecks(storedDecks);
        addHungarianDeckIfNotExists(storedDecks);
    }, []);

    const addHungarianDeckIfNotExists = (currentDeckList: Deck[]): void => {
        const hungarianDeckName = 'Magyar HP';
        const words = WORDS_HP_HU;
        let deck = currentDeckList.find((deck) => deck.name === hungarianDeckName);

        if (!deck) {
            deck = handleSaveDeck(hungarianDeckName, false);
            initializeDeckWords(deck.id, words);
        } else {
            setNextDeckWords(deck, words);
        }
    }

    const handleDeckClick = (id: number) => {
        navigate(`/deck/${id}`);
    };

    const handleAddClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveDeck = (name: string, reminder: boolean): Deck => {
        const newDeck: Deck = {
            id: decks.length ? decks[decks.length - 1].id + 1 : 1,
            name,
            toReview: 0,
            total: 0,
            words: [],
            lastUpdated: new Date()
        };
        const updatedDecks = [...decks, newDeck];
        setDecks(updatedDecks);
        localStorage.setItem('decks', JSON.stringify(updatedDecks));

        return newDeck;
    };

    return (
        <div className="container mx-auto p-4">
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Lingodoo</h1>
                <button
                    onClick={handleAddClick}
                    className="text-2xl bg-black text-white rounded-full w-10 h-10 flex items-center justify-center">+
                </button>
            </header>
            <main className="flex flex-col gap-4">
                {decks.map((deck) => (
                    <div key={deck.id} onClick={() => handleDeckClick(deck.id)}>
                        <DeckItem name={deck.name} toReview={deck.toReview} total={deck.total} />
                    </div>
                ))}
            </main>
            <DeckModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveDeck} />
        </div>
    );
};

export default DeckList;
