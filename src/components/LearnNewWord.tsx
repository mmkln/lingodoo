import React from 'react';
import {WordCard} from '.';
import { Word } from '../models';

interface LearnNewWordProps {
    data: Word;
    onClick: () => void;
}

export const LearnNewWord: React.FC<LearnNewWordProps> = (props) => {
    return <>
        <WordCard data={props.data}/>
        <div className="flex gap-4 justify-center">
            <button
                onClick={props.onClick}
                className="btn-default overflow-hidden relative w-64 bg-stone-50 text-gray-900 py-4 px-4 rounded-xl font-bold uppercase transition-all duration-100 -- hover:shadow-md border border-stone-100 hover:bg-gradient-to-t hover:from-stone-100 before:to-stone-50 hover:-translate-y-[3px]">
                <span className="relative">Наступне</span>
            </button>
        </div>
    </>;
}
