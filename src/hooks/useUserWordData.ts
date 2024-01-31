import { useState, useEffect } from 'react';

import {LanguageCode, UserDaysCount, UserWordData, Word} from '../models';
import {LS_KEYS} from "../constants";
import {WORD_LIST, WORD_LIST_HUNGARIAN} from "../data";

import {getLocalStorageItem, setLocalStorageItem} from "../helpers";
import {cutArrayRange} from "../utils";

export const useUserWordData = () => {
    const [userDaysCount, setUserDaysCount] = useState<UserDaysCount | null>();
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode | null>(null);
    const [wordsForToday, setWordsForToday] = useState<Word[]>([]);

    useEffect(() => {
        initUserData();
    }, []);

    useEffect(() => {
        if (selectedLanguage) {
            const userDaysCountMap = {...userDaysCount};
            if (!userDaysCountMap[selectedLanguage]) {
                userDaysCountMap[selectedLanguage] = 1;
                setLocalStorageItem<UserDaysCount>(LS_KEYS.userDaysCount, userDaysCountMap);
                setUserDaysCount(userDaysCountMap);
            }

            const start = ((userDaysCountMap[selectedLanguage] || 1) - 1) * 5;
            const end = start + 4;
            const words = getWordListByLanguage(selectedLanguage);
            setWordsForToday(cutArrayRange<Word>(words, start, end));
        }
    }, [selectedLanguage]);

    const initUserData = () => {
        const daysCount = getLocalStorageItem<UserDaysCount>(LS_KEYS.userDaysCount);
        const language = getLocalStorageItem<LanguageCode>(LS_KEYS.selectedLanguage);
        const today = new Date();

        setLocalStorageItem(LS_KEYS.userLastVisitDate, today);
        if (daysCount) {
            setUserDaysCount(daysCount);
        }
        if (language) {
            setSelectedLanguage(language);
        }
    }

    const getWordListByLanguage = (language: LanguageCode): Word[] => {
        switch (language) {
            case LanguageCode.EN:
                return WORD_LIST;
            case LanguageCode.HU:
                return WORD_LIST_HUNGARIAN;
            default:
                return [];
        }
    }

    const calculateNextReviewDate = (reviewCount: number): Date => {
        // Приклад простого алгоритму. Можна змінити на складніший
        const daysToAdd = reviewCount < 1 ? 1 : reviewCount * 2;
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + daysToAdd);
        return nextDate;
    };

    const setLanguage = (language: LanguageCode) => {
        setSelectedLanguage(language);
        setLocalStorageItem(LS_KEYS.selectedLanguage, language);
    }

    const updateUserWordData = (wordId: number, remembered: boolean) => {
        // const updatedWords = userWords.map(wordData => {
        //     if (wordData.wordId === wordId) {
        //         const updatedReviewCount = remembered ? wordData.reviewCount + 1 : 0;
        //         return {
        //             ...wordData,
        //             reviewCount: updatedReviewCount,
        //             nextReviewDate: calculateNextReviewDate(updatedReviewCount)
        //         };
        //     }
        //     return wordData;
        // });

        // setUserWords(updatedWords);
        // localStorage.setItem('userWords', JSON.stringify(updatedWords));
    };

    const planNextSession = () => {
        // Оновіть 'nextReviewDate' на основі результатів
        // Наприклад, ви можете використовувати простий алгоритм, щоб визначити наступну дату повторення
        // userWords.forEach(word => {
        //     // Логіка визначення наступної дати повторення
        // });

        // Збережіть оновлені дані користувача в localStorage
        // localStorage.setItem('userWords', JSON.stringify(userWords));
    };

    return { userLanguage: selectedLanguage, updateUserWordData, planNextSession, setLanguage, wordsForToday };
};
