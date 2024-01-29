import React from 'react';
import { WordData } from '../models/WordData';

interface WordCardProps {
    data: WordData;
    onReview: (reviewed: boolean) => void;
}

const WordCard: React.FC<WordCardProps> = ({ data, onReview }) => {
    return (
        <div className="card">
            <h3>{data.word}</h3>
            <p>{data.translation}</p>
            <p>{data.example}</p>
            {/* generate answer icon buttons (yes/no) using tailwind*/}
            <div className="flex justify-center">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-2" onClick={() => onReview(true)}>Yes</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => onReview(false)}>No</button>
            </div>
        </div>
    );
};

export default WordCard;
