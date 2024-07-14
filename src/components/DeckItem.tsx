import React from 'react';

type DeckProps = {
    name: string;
    toReview: number;
    total: number;
};

const DeckItem: React.FC<DeckProps> = ({ name, toReview, total }) => {
    return (
        <div className="border rounded-lg p-4 flex flex-col gap-2">
            <h2 className="text-lg font-bold">{name}</h2>
            <div className="flex gap-4">
        <span className={`rounded-md px-2 py-1 font-bold ${toReview === 0 ? 'bg-green-300' : 'bg-yellow-300'}`}>
          {toReview} to review
        </span>
                <span className="bg-blue-500 text-white rounded-md px-2 py-1 font-bold">{total} total</span>
            </div>
        </div>
    );
};

export default DeckItem;
