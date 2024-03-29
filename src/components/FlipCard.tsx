import React, {useState} from 'react';
import {Word} from '../models';

interface FlipCardProps {
    data: Word;
}

const FlipCard: React.FC<FlipCardProps> = ({ data }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="w-[26rem] h-56 perspective">
            <div onClick={() => setIsFlipped(!isFlipped)} className={`flip-card w-full h-full ${isFlipped ? 'flip-rotate-x-back' : ''}`}>
                <div className="flip-front flex justify-center items-center rounded-lg border bg-white p-4 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-800">{data.word}</h3>
                </div>
                <div className="flip-back flex justify-center items-center  rounded-lg border bg-white p-4 shadow-lg">
                    <h3 className="text-lg font-semibold">{data.translation}</h3>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
