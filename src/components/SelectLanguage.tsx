import React from "react";
import {LanguageCode} from "../models";

interface SelectLanguageProps {
    setLanguage: (language: LanguageCode) => void;
}

export const SelectLanguage: React.FC<SelectLanguageProps> = ({setLanguage}) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Select Language</h1>
            <div className="space-x-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        setLanguage(LanguageCode.EN);
                    }}
                >
                    English
                </button>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        setLanguage(LanguageCode.HU);
                    }}
                >
                    Magyar
                </button>
            </div>
        </div>
    );
};
