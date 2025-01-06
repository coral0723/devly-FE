"use client"

import { Mic } from 'lucide-react';
import { WordData } from '../types';

interface SpeakingStepProps {
    word: WordData;
    speaking: boolean;
    onStartSpeaking: () => void;
}

export function SpeakingStep({ word, speaking, onStartSpeaking }: SpeakingStepProps) {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-xl font-bold mb-4">다음 단어를 발음해보세요</h2>
                <div className="text-3xl font-bold text-blue-600 mb-6">
                    {word.word}
                </div>
                <button
                    onClick={onStartSpeaking}
                    className={`
                        p-6 rounded-full 
                        ${speaking
                            ? 'bg-red-500 animate-pulse'
                            : 'bg-blue-500 hover:bg-blue-600'
                        }
                    `}
                >
                    <Mic size={32} className="text-white"/>
                </button>
                <p className="mt-4 text-gray-500">
                    {speaking ? '듣고 있습니다...' : '버튼을 누르고 발음하세요'}
                </p>
            </div>
        </div>
    );
}