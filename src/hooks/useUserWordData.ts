import { useState, useEffect } from 'react';
import { UserWordData } from '../models';

export const useUserWordData = () => {
    const [userWords, setUserWords] = useState<UserWordData[]>([]);

    useEffect(() => {
        // Зчитування даних користувача з localStorage
        const storedData = localStorage.getItem('userWords');
        if (storedData) {
            setUserWords(JSON.parse(storedData));
        }
    }, []);

    const calculateNextReviewDate = (reviewCount: number): Date => {
        // Приклад простого алгоритму. Можна змінити на складніший
        const daysToAdd = reviewCount < 1 ? 1 : reviewCount * 2;
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + daysToAdd);
        return nextDate;
    };

    const updateUserWordData = (wordId: number, remembered: boolean) => {
        const updatedWords = userWords.map(wordData => {
            if (wordData.wordId === wordId) {
                const updatedReviewCount = remembered ? wordData.reviewCount + 1 : 0;
                return {
                    ...wordData,
                    reviewCount: updatedReviewCount,
                    nextReviewDate: calculateNextReviewDate(updatedReviewCount)
                };
            }
            return wordData;
        });

        setUserWords(updatedWords);
        localStorage.setItem('userWords', JSON.stringify(updatedWords));
    };

    const planNextSession = () => {
        // Оновіть 'nextReviewDate' на основі результатів
        // Наприклад, ви можете використовувати простий алгоритм, щоб визначити наступну дату повторення
        userWords.forEach(word => {
            // Логіка визначення наступної дати повторення
        });

        // Збережіть оновлені дані користувача в localStorage
        localStorage.setItem('userWords', JSON.stringify(userWords));
    };

    return { userWords, updateUserWordData, planNextSession };
};
