import React, { useState } from 'react';
import { Word } from '../models';

interface FlipCardProps {
    data: Word;
}

const FlipCard: React.FC<FlipCardProps> = ({ data }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="w-80 h-56 perspective">
            <div onClick={() => setIsFlipped(!isFlipped)} className={`flip-container relative w-full h-full ${isFlipped ? 'is-flipped' : ''}`}>
                <div className="flip-card absolute inset-0">
                    <div className="flip-front absolute inset-0 rounded-lg border bg-white p-4 shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-800">{data.word}</h3>
                    </div>
                    <div className="flip-back absolute inset-0 transform rotate-x-180 rounded-lg border bg-white p-4 shadow-lg">
                        <p className="text-gray-600">{data.translation}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
