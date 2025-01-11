"use client"

import type { WordData } from '../types';

interface WordStepProps {
    word: WordData;
    onNext: () => void;
}

export function WordStep({ word, onNext }: WordStepProps) {
	return (
		<div className="space-y-8">
			<div className="text-center">
				<h1 className="text-2xl font-bold mb-2">{word.word}</h1>
				<p className="text-gray-500">{word.pronunciation}</p>
				<button
					className="mt-4 p-4 bg-gray-100 rounded-full hover:bg-gray-200"
					onClick={() => {/* 발음 재생 */}}
				>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>
				</svg>

				</button>
			</div>
				<div className="text-center text-lg text-gray-600">
					{word.meaning}
				</div>
        <div className="absolute bottom-0 left-0 flex justify-center w-full mb-4">
          <button
            onClick={onNext}
            className="py-4 mb-4 bg-green-500 text-white rounded-xl text-lg font-medium hover:bg-green-600 active:scale-[0.98] transition-all"
            style={{ width: "90%" }}
          >
            다음
          </button>
			</div>
		</div>
  );
}