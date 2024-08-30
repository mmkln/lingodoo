import React from 'react';
import { Word } from '../models';
import { FlipCard } from '../components';

interface ReviewWordProps {
    data: Word;
    onClick: (event: boolean) => void;
}

export const ReviewWord: React.FC<ReviewWordProps> = ({data, onClick}) => {
    return <>
        <FlipCard data={data}/>
        <div className="flex gap-4 justify-center">
            {/*<div*/}
            {/*    onClick={() => handleReview(true)}*/}
            {/*    className='button w-40 h-16 bg-blue-500  cursor-pointer select-none*/}
            {/*    active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]*/}
            {/*    active:border-b-[0px]*/}
            {/*    transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]*/}
            {/*    rounded-full  border-[1px] border-blue-400'*/}
            {/*>*/}
            {/*    <span*/}
            {/*        className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>Знаю</span>*/}
            {/*</div>*/}
            <div
                onClick={() => onClick(true)}
                className="button w-40 h-16 bg-emerald-500  cursor-pointer select-none
                                    active:translate-y-2  active:[box-shadow:0_0px_0_0_#059669,0_0px_0_0_#34d399]
                                    active:border-b-[0px]
                                    transition-all duration-150 [box-shadow:0_10px_0_0_#059669,0_15px_0_0_#34d399]
                                    rounded-full  border-[1px] border-emerald-400"
            >
                                    <span
                                        className="flex flex-col justify-center items-center h-full text-white font-bold text-lg ">Знаю</span>
            </div>
            <div
                onClick={() => onClick(false)}
                className="button w-40 h-16 bg-gray-300  cursor-pointer select-none
                                    active:translate-y-2  active:[box-shadow:0_0px_0_0_#9ca3af,0_0px_0_0_#e5e7eb]
                                    active:border-b-[0px]
                                    transition-all duration-150 [box-shadow:0_10px_0_0_#9ca3af,0_15px_0_0_#e5e7eb]
                                    rounded-full  border-[1px] border-gray-200"
            >
                                    <span
                                        className="flex flex-col justify-center items-center h-full text-white font-bold text-lg ">Не помню</span>
            </div>
            {/*<button*/}
            {/*    onClick={() => handleReview(true)}*/}
            {/*    className="group relative h-12 w-48 overflow-hidden rounded-2xl bg-green-500 text-lg font-bold text-white">*/}
            {/*    Запамятав*/}
            {/*    <div*/}
            {/*        className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>*/}
            {/*</button>*/}
            {/*<button*/}
            {/*    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"*/}
            {/*    onClick={() => handleReview(false)}>Не памятаю*/}
            {/*</button>*/}
        </div>
    </>;
}
