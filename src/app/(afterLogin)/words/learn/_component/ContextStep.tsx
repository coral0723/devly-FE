"use client"

import { Fragment } from 'react';
import { BookOpen } from 'lucide-react';
import { WORDS_DATA } from '../words';
import { WordData } from '../types';

interface ContextStepProps {
    index: number;
    word: WordData;
    onNext: () => void;
}

export function ContextStep({ index, word, onNext }: ContextStepProps) {
    return (
        <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-gray-500 text-sm">
                    <BookOpen size={16}/>
                    <span>출처: {word.example.source}</span>
                </div>
                <div className="text-lg mb-4 font-mono">
                    {word.example.text.split(word.example.highlight).map((part, i, arr) => (
                        <Fragment key={i}>
                            {part}
                            {i < arr.length - 1 && (
                                <span className="font-bold text-blue-600">
                                    {word.example.highlight}
                                </span>
                            )}
                        </Fragment>
                    ))}
                </div>
                <div className="text-gray-600 border-t border-gray-100 pt-4">
                    {word.example.context}
                </div>
            </div>
            <button
                onClick={onNext}
                className="w-full py-4 bg-green-500 text-white rounded-xl text-lg font-medium hover:bg-green-600 active:scale-[0.98] transition-all"
            >
                {index === 1 ? "퀴즈 풀기": "다음 단어"}
            </button>
        </div>
    );
}