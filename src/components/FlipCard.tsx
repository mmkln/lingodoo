import React, { useState, useEffect, useCallback } from 'react';
import { DeckWord, Word } from '../models';

interface FlipCardProps {
  data: DeckWord | Word;
}

const FlipCard: React.FC<FlipCardProps> = ({ data }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [data]);

    return (
        <div className="w-[26rem] h-56 perspective">
            <div
              onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && setIsFlipped((prev) => !prev)}
              onClick={() => setIsFlipped((prev) => !prev)} className={`flip-card w-full h-full ${isFlipped ? 'flip-rotate-x-back' : ''}`}>
                <div className="flip-front flex justify-center items-center rounded-lg border bg-white p-4 shadow-lg">
                    <h3 className="text-3xl font-semibold text-gray-800">{data.word}</h3>
                </div>
              <div
                className="flip-back flex flex-col justify-center items-center rounded-lg border bg-white p-4 shadow-lg">
                {data.explanation && (<p className="text-base font-medium text-gray-400">{data.explanation}</p>)}
                <h3 className="text-3xl font-semibold text-gray-800">{data.translation}</h3>
                <p className="text-base font-medium text-gray-400">{data.example}</p>
              </div>
            </div>
        </div>
    );
};

export default FlipCard;