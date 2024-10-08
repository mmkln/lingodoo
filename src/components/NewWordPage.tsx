import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Deck, DeckWord } from '../models';
import { FlipCardInput } from "./FlipCardInput";
import { getLocalStorageItem, initializeWord, setLocalStorageItem, setWordIntoDeck } from '../helpers';
import { LS_KEYS } from '../constants';


const NewWordPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [isFlipped, setIsFlipped] = useState(false);

    const handleSave = () => {
        const newWord ={
            word: front,
            translation: back,
            example: 'string' // Dummy data
        };

        id && setWordIntoDeck(id, newWord);

        navigate(`/deck/${id}`);
    };


    return (
        <div className="container mx-auto p-4">
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Ebbinghaus</h1>
                <button className="text-2xl" onClick={() => navigate(-1)}>×</button>
            </header>

            <div className="flex mb-4 justify-between items-center">
                <button
                    className="px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                    onClick={() => setIsFlipped(!isFlipped)}>
                    {isFlipped ? 'Flip to front' : 'Flip to back'}
                </button>
                <button
                    disabled={!front || !back}
                    className={`px-5 py-2 text-sm text-white transition-colors duration-200 border rounded-lg ${
                        !front || !back
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-green-500 hover:bg-green-600 dark:bg-green-900 dark:hover:bg-green-800 dark:text-gray-200 dark:border-gray-700'
                    }`}
                    onClick={handleSave}
                >
                    + Add
                </button>
            </div>


            <FlipCardInput front={front} back={back} isFlipped={isFlipped} setFront={setFront} setBack={setBack}/>
        </div>
    );
};

export default NewWordPage;
