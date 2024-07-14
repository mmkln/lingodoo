import React from 'react';

type WordItemProps = {
    word: string;
    translation: string;
};

export const WordItem: React.FC<WordItemProps> = ({ word, translation }) => {
    return (
        <div className="border rounded-lg p-4 mb-2">
            <div className="text-lg font-bold">{word}</div>
            <div className="text-sm text-gray-600">{translation}</div>
        </div>
    );
};

