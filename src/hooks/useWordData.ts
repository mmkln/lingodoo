import { useState, useEffect } from 'react';
import { WordData } from '../models/WordData';

const useWordData = () => {
    const [words, setWords] = useState<WordData[]>([]);
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

    useEffect(() => {
        // Завантаження словникового запасу
        // setWords(завантажені дані)
    }, []);

    const updateWordReview = (index: number, reviewed: boolean) => {
        const newWords = [...words];
        newWords[index] = {
            ...newWords[index],
            reviewCount: newWords[index].reviewCount + 1,
            nextReviewDate: calculateNextReviewDate(newWords[index].reviewCount)
        };
        setWords(newWords);
        findNextWord();
    };

    const calculateNextReviewDate = (reviewCount: number): Date => {
        // Тут буде розрахунок дати наступного повторення
        return new Date();
    };

    const findNextWord = () => {
        // Логіка для визначення наступного слова
        // Може включати перевірку дати наступного повторення
        // та вибір слова, яке потребує повторення або нового вивчення
        const nextIndex = 0/* ваш алгоритм */;
        setCurrentWordIndex(nextIndex);
    };

    return { words, currentWordIndex, setCurrentWordIndex, updateWordReview };
};

export default useWordData;
