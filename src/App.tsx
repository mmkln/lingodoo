import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
    LearnNewWord,
    ReviewWord,
    StarsRating,
    SelectLanguage,
    DeckList,
    DeckPage,
    NewWordPage,
    ReviewPage,
} from './components';
import {useUserWordData} from './hooks';
import {LanguageCode, Word} from './models';

const App: React.FC = () => {
    const { updateUserWordData, userLanguage, setLanguage, wordsForToday, setLearnedAllTodayWords } = useUserWordData();
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [showReviewResults, setShowReviewResults] = useState(false);
    const [results, setResults] = useState({ remembered: 0, total: 5 });
    const [sessionStarted, setSessionStarted] = useState(false);
    const [learningMode, setLearningMode] = useState<'new' | 'review'>('new');
    const [word, setWord] = useState<Word | null>(null);

    useEffect(() => {
    }, []);

    const handleReview = (remembered: boolean) => {
        // Оновлення даних користувача на основі його відповіді
        if (remembered) {
            setResults(prevResults => ({ ...prevResults, remembered: prevResults.remembered + 1 }));
        }
        updateUserWordData(currentWordIndex, remembered);

        // Перехід до наступного слова
        const nextIndex = currentWordIndex + 1;
        if (nextIndex < wordsForToday.length) {
            setWord(wordsForToday[nextIndex]);
            setCurrentWordIndex(nextIndex);
        } else {
            setShowReviewResults(true);
        }
    };

    const handleNext = () => {
        // Перехід до наступного слова
        const nextIndex = currentWordIndex + 1;
        if (nextIndex < wordsForToday.length) {
            setWord(wordsForToday[nextIndex]);
            setCurrentWordIndex(nextIndex);
        } else {
            setLearnedAllTodayWords();
            setShowReviewResults(true);
        }
    };

    const startLearningSession = () => {
        console.log({wordsForToday});
        setWord(wordsForToday[currentWordIndex]);
        setSessionStarted(true);
        setLearningMode('new'); // Початок з режиму ознайомлення з новими словами
        setCurrentWordIndex(0);
        setShowReviewResults(false);
    };

    const startReviewSession = () => {
        setWord(wordsForToday[0]);
        setCurrentWordIndex(0);
        setResults({ remembered: 0, total: wordsForToday.length });
        setLearningMode('review'); // Початок з режиму повторення
        setSessionStarted(true);
        setShowReviewResults(false);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<DeckList />} />
                <Route path="/deck/:id" element={<DeckPage />} />
                <Route path="/new-word/:id" element={<NewWordPage />} />
                <Route path="/review/:id" element={<ReviewPage />} />
            </Routes>
        </Router>
    );
        {/*<div className="app w-full h-lvh flex justify-center items-center bg-gray-100">*/}
        {/*    {!sessionStarted ?  (*/}
        {/*        userLanguage ? (*/}
        {/*            <button onClick={startLearningSession} className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">*/}
        {/*                <div className="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>*/}
        {/*                <span className="relative text-black group-hover:text-white">Почати Навчання!</span>*/}
        {/*            </button>*/}
        {/*        ) : (*/}
        {/*            <SelectLanguage setLanguage={setLanguage} />*/}
        {/*        )*/}
        {/*    ) : (*/}
        {/*        showReviewResults ? (*/}
        {/*            <div>*/}
        {/*                {learningMode === 'new' ? (*/}
        {/*                    <div className="flex gap-4 items-center">*/}
        {/*                        <p>Тепер ви знаєте {results.total} нових слів.</p>*/}
        {/*                        <div className="flex gap-4 items-center">*/}
        {/*                            <button onClick={startReviewSession}*/}
        {/*                                    className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">*/}
        {/*                                <div*/}
        {/*                                    className="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>*/}
        {/*                                <span className="relative text-black group-hover:text-white">Повторити!</span>*/}
        {/*                            </button>*/}
        {/*                        </div>*/}
        {/*                    </div>*/}
        {/*                ) : (*/}
        {/*                    <div className="flex flex-col gap-4 justify-center items-center">*/}
        {/*                        <p>Ви запам'ятали {results.remembered} із {results.total} слів.</p>*/}
        {/*                        <StarsRating count={results.remembered} outOf={results.total} />*/}
        {/*                    </div>*/}
        {/*                )}*/}
        {/*                /!* Тут можна додати кнопки або дії для наступної сесії *!/*/}
        {/*            </div>*/}
        {/*        ) : (*/}
        {/*            <div className="flex flex-col gap-4">*/}
        {/*                {learningMode === 'new' ? (*/}
        {/*                    (word && <LearnNewWord data={word} onClick={() => handleNext()}/>)*/}
        {/*                ) : (*/}
        {/*                    (word && <ReviewWord data={word} onClick={(event: boolean) => handleReview(event)} />)*/}
        {/*                )}*/}
        {/*            </div>*/}
        {/*        )*/}
        {/*    )}*/}
        {/*</div>*/}
    // );
};

export default App;
