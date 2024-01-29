import React from 'react';
import WordCard from './components/WordCard';
import ProgressBar from './components/ProgressBar';
import useWordData from './hooks/useWordData';

const App: React.FC = () => {
    const { words, currentWordIndex, setCurrentWordIndex, updateWordReview } = useWordData();

    const handleReview = (reviewed: boolean) => {
        updateWordReview(currentWordIndex, reviewed);
        // Визначення індексу наступного слова для вивчення/повторення
        // setCurrentWordIndex(новий_індекс);
    };

    return (
        <div className="app">
            {words.length > 0 && (
                <>
                    <WordCard data={words[currentWordIndex]} onReview={handleReview} />
                    {/* Тут може бути ProgressBar та інші елементи інтерфейсу */}
                </>
            )}
        </div>
    );
};

export default App;
