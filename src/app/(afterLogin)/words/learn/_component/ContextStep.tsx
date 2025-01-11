"use client"

import { Fragment } from 'react';
import { BookOpen } from 'lucide-react';
import { WordData } from '../types';
import { Word } from '@/model/Word';

interface ContextStepProps {
	index: number;
	word: Word;
  wordsLength: number;
	onNext: () => void;
}

export function ContextStep({ index, word, wordsLength, onNext }: ContextStepProps) {
	return (
		<div className="space-y-8">
			<div className="bg-white rounded-xl p-6 shadow-sm">
				<div className="flex items-center gap-2 mb-4 text-gray-500 text-sm">
					<BookOpen size={16}/>
					<span>출처: {word.example.source}</span>
				</div>
				<div className="text-lg mb-4 font-mono">
					{word.example.text.split(word.word).map((part, i, arr) => (
						<Fragment key={i}>
							{part}
							{i < arr.length - 1 && (
								<span className="font-bold text-blue-600">
									{word.word}
								</span>
							)}
						</Fragment>
					))}
				</div>
				<div className="text-gray-600 border-t border-gray-100 pt-4">
					{word.example.context}
				</div>
			</div>
			<div className="absolute bottom-0 left-0 flex justify-center w-full mb-4">
        <button
            onClick={onNext}
            className={`py-4 mb-4 text-white rounded-xl text-lg font-medium transition-all active:scale-[0.98]
              ${index === wordsLength-1 
                ? "bg-blue-500 hover:bg-blue-600 border-blue-400" 
                : "bg-green-500 hover:bg-green-600"
              }`}
            style={{ width: "90%" }}
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