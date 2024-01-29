import React, {useEffect, useState} from 'react';
import {FlipCard, WordCard} from './components';
import { WORD_LIST } from './data/words';
import {useUserWordData} from './hooks';
import { UserWordData, Word } from './models';

const App: React.FC = () => {
    const { userWords, updateUserWordData } = useUserWordData();
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [showReviewResults, setShowReviewResults] = useState(false);
    const [results, setResults] = useState({ remembered: 0, total: 5 });
    const [wordsToReview, setWordsToReview] = useState<Word[]>([]);
    const [sessionStarted, setSessionStarted] = useState(false);
    const [learningMode, setLearningMode] = useState<'new' | 'review'>('new');

    useEffect(() => {
        // Логіка визначення слів для навчання або повторення
        const today = new Date();
        const wordsForToday = userWords?.length ? WORD_LIST.filter(word =>
            userWords.some(uw => uw.wordId === word.id && uw.nextReviewDate <= today)
        ).slice(0, 5) : WORD_LIST.slice(0, 5);  // Обмеження до перших 5 слів
        setWordsToReview(wordsForToday);
    }, [userWords]);

    const handleReview = (remembered: boolean) => {
        // Оновлення даних користувача на основі його відповіді
        if (remembered) {
            setResults(prevResults => ({ ...prevResults, remembered: prevResults.remembered + 1 }));
        }
        updateUserWordData(currentWordIndex, remembered);

        // Перехід до наступного слова
        const nextIndex = currentWordIndex + 1;
        if (nextIndex < wordsToReview.length) {
            setCurrentWordIndex(nextIndex);
        } else {
            setShowReviewResults(true);
        }
    };

    const handleNext = () => {
        // Перехід до наступного слова
        const nextIndex = currentWordIndex + 1;
        if (nextIndex < wordsToReview.length) {
            setCurrentWordIndex(nextIndex);
        } else {
            setShowReviewResults(true);
        }
    };

    const startLearningSession = () => {
        setSessionStarted(true);
        setLearningMode('new'); // Початок з режиму ознайомлення з новими словами
        setCurrentWordIndex(0);
    };

    const startReviewSession = () => {
        setSessionStarted(true);
        setLearningMode('review'); // Початок з режиму повторення
        setCurrentWordIndex(0);
    };

    const word = WORD_LIST[currentWordIndex];

    return (
        <div className="app w-full h-lvh flex justify-center items-center bg-gray-100">
            {!sessionStarted ?  (
                <button onClick={startLearningSession} className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">
                    <div className="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                    <span className="relative text-black group-hover:text-white">Почати Навчання!</span>
                </button>
            ) : (
                showReviewResults ? (
                    <div>
                        <p>Ви запам'ятали {results.remembered} із {results.total} слів.</p>
                        {/* Тут можна додати кнопки або дії для наступної сесії */}
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {learningMode === 'new' ? (
                            <>
                                <WordCard data={word} />
                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={() => handleNext()}
                                        className="btn-default overflow-hidden relative w-64 bg-stone-50 text-gray-900 py-4 px-4 rounded-xl font-bold uppercase transition-all duration-100 -- hover:shadow-md border border-stone-100 hover:bg-gradient-to-t hover:from-stone-100 before:to-stone-50 hover:-translate-y-[3px]">
                                        <span className="relative">Наступне</span>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <FlipCard data={word} />
                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={() => handleReview(true)}
                                        className="group relative h-12 w-48 overflow-hidden rounded-2xl bg-green-500 text-lg font-bold text-white">
                                        Запамятав
                                        <div
                                            className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                    </button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                            onClick={() => handleReview(false)}>Не памятаю
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )
            )}
        </div>
    );
};

export default App;
