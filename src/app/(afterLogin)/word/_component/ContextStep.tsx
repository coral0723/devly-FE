"use client"

import { Fragment } from 'react';
import { BookOpen } from 'lucide-react';
import { Word } from '@/model/word/Word';
import { Example } from '@/model/word/Example';

type Props = {
  index: number;
  word: Word;
  wordsLength: number;
  onNext: () => void;
}

export function ContextStep({ index, word, wordsLength, onNext }: Props) {
  const example: Example = JSON.parse(word.example);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-gray-500 text-sm">
          <BookOpen size={16}/>
          <span>출처: {example.source}</span>
        </div>
        <div className="text-lg mb-4 font-mono">
          {example.text.split(new RegExp(`(${word.word})`, 'i')).map((part, i) => (
            <Fragment key={i}>
              {part.toLowerCase() === word.word.toLowerCase() ? (
                <span className="font-bold text-blue-600">
                  {part}
                </span>
              ) : part}
            </Fragment>
          ))}
        </div>
        <div className="text-gray-600 border-t border-gray-100 pt-4">
          {example.translation}
        </div>
      </div>
      <div className="fixed w-full max-w-lg bottom-0 left-1/2 transform -translate-x-1/2 bg-white p-2 border border-gray-200 z-10">
        <button
          onClick={onNext}
          className={`w-full py-3 text-white rounded-xl text-lg font-medium transition-all active:scale-[0.98]
            ${index === wordsLength-1 
              ? "bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600" 
              : "bg-green-500 hover:bg-green-600"
            }`}
        >
          {index === wordsLength-1 ? (
            <div className="flex items-center justify-center gap-2">
              <span>퀴즈 풀기</span>
              <svg 
                className="w-6 h-6 animate-bounce" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          ) : (
            "다음 단어"
          )}
        </button>
      </div>
    </div>
  );
}