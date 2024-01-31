import React, {useEffect, useState} from 'react';
import { LearnNewWord, ReviewWord, StarsRating, WordCard} from './components';
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
        setShowReviewResults(false);
    };

    const startReviewSession = () => {
        setCurrentWordIndex(0);
        setSessionStarted(true);
        setLearningMode('review'); // Початок з режиму повторення
        setShowReviewResults(false);
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
                        {learningMode === 'new' ? (
                            <div className="flex gap-4 items-center">
                                <p>Тепер ви знаєте {results.total} нових слів.</p>
                                <div className="flex gap-4 items-center">
                                    <button onClick={startReviewSession}
                                            className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">
                                        <div
                                            className="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                                        <span className="relative text-black group-hover:text-white">Повторити!</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 justify-center items-center">
                                <p>Ви запам'ятали {results.remembered} із {results.total} слів.</p>
                                <StarsRating count={results.remembered} outOf={results.total} />
                            </div>
                        )}
                        {/* Тут можна додати кнопки або дії для наступної сесії */}
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {learningMode === 'new' ? (
                            <LearnNewWord data={word} onClick={() => handleNext()}/>
                        ) : (
                            <ReviewWord data={word} onClick={(event: boolean) => handleReview(event)} />
                        )}
                    </div>
                )
            )}
        </div>
    );
};

export default App;
