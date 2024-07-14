import React from "react";

export const FlipCardInput: React.FC<{ front: string; back: string; isFlipped: boolean; setFront: (value: string) => void; setBack: (value: string) => void; }> = ({ front, back, isFlipped, setFront, setBack }) => {
    return (
        <div className="w-full h-56 perspective">
            <div  className={`flip-card w-full h-full ${isFlipped ? 'flip-rotate-x-back' : ''}`}>
                <div className="flip-front flex justify-center items-center rounded-lg border bg-white p-4 shadow-lg backface-hidden">
                    <input
                        className="text-lg font-semibold text-gray-800 border-0 focus:outline-none"
                        value={front}
                        onChange={(e) => setFront(e.target.value)}
                        placeholder="Front"
                    />
                </div>
                <div className="flip-back flex justify-center items-center rounded-lg border bg-white p-4 shadow-lg backface-hidden transform rotate-y-180">
                    <input
                        className="text-lg font-semibold text-gray-800 border-0 focus:outline-none"
                        value={back}
                        onChange={(e) => setBack(e.target.value)}
                        placeholder="Back"
                    />
                </div>
            </div>
        </div>
    );
};
