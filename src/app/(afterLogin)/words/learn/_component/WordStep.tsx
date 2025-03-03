"use client"

import { Word } from '@/model/Word';
import { useCallback, useState } from 'react';

type Props = {
    word: Word;
    onNext: () => void;
}

export function WordStep({ word, onNext }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const speak = useCallback(() => {
    // 브라우저가 음성 합성을 지원하는지 확인
    if ('speechSynthesis' in window) {
      // 발음 재생 중지 (이전 발음이 재생 중일 경우)
      window.speechSynthesis.cancel();

      // 새로운 발음 설정
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.lang = 'en-US'; // 영어 설정
      utterance.rate = 0.9; // 약간 천천히 설정 (기본값은 1)

      // 재생 시작 시 상태 변경
      setIsPlaying(true);

      //재생이 끝났을 때 상태 변경
      utterance.onend = () => {
        setIsPlaying(false);
      };
        
      // 음성 목소리 설정 (가능한 경우 여성 음성 선택)
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(voice => 
          voice.lang.includes('en') && voice.name.includes('Female')
      );
      if (englishVoice) {
          utterance.voice = englishVoice;
      }

      // 발음 재생
      window.speechSynthesis.speak(utterance);
    } else {
      console.log('이 브라우저는 음성 합성을 지원하지 않습니다.');
    }
  }, [word.word]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">{word.word}</h1>
        <p className="text-gray-500">{word.pronunciation}</p>
        <button
          className={`mt-4 p-4 rounded-full transition-all duration-200
            ${isPlaying 
              ? 'bg-blue-100 hover:bg-blue-200 ring-2 ring-blue-400 ring-opacity-50' 
              : 'bg-gray-100 hover:bg-gray-200'
            }`}
          onClick={speak}
          aria-label="발음 듣기"
          disabled={isPlaying}
        >
          {isPlaying ? (
            // 재생 중일 때의 아이콘
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
              <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>
              <path d="M16 9a5 5 0 0 1 0 6"/>
              <path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>
            </svg>
            ) : (
              // 기본 아이콘
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>
                <path d="M16 9a5 5 0 0 1 0 6"/>
                <path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>
              </svg>
            )}
        </button>
      </div>
      <div className="text-center text-lg text-gray-600">
        {word.meaning}
      </div>
      <div className="fixed w-full max-w-lg bottom-0 left-1/2 transform -translate-x-1/2 p-2 bg-white border border-gray-200 z-10">
        <button
          className=" w-full py-3 bg-green-500 text-white rounded-xl text-lg font-medium hover:bg-green-600 active:scale-[0.98] transition-all"
          onClick={onNext}
        >
          다음
        </button>
      </div>
    </div>
  );
}