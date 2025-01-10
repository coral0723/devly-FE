"use client"

import { BookOpen, Check } from "lucide-react";
import { WordData } from "../types";
import { Fragment, useState } from "react";

type Props = {
  index: number;
  word: WordData;
  completedWords: number;
  setCompletedWords: (completedWords: number) => void;
  handleQuizNext: () => void;
}

export default function QuizStep({index, word, completedWords, setCompletedWords, handleQuizNext }: Props) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showCorect, setShowCorrect] = useState<boolean>(false);
  
  const options = [
    "implementation",
    "book",
    "number",
    "deprecated",
    "import"
  ];

  const onNext = () => {
    setTimeout(() => {
      setShowCorrect(false);
      setSelectedOption(null);
      setCompletedWords(completedWords + 1);
      handleQuizNext();
    }, 1500);
    setShowCorrect(true);
  }

  const getButtonStyle = (option: string, idx: number) => {
    if (!showCorect) {
      return "hover:bg-gray-50";
    }
    
    if (option === word.word) {
      return "bg-green-100"; // 정답인 경우 초록색 배경
    }
    
    if (selectedOption === idx && option !== word.word) {
      return "bg-red-100"; // 선택했지만 오답인 경우 빨간색 배경
    }
    
    return "";
  };

  const getCircleStyle = (option: string, idx: number) => {
    if (showCorect) {
      if (option === word.word) {
        return "bg-green-500 border-green-500"; // 정답인 경우 초록색 원
      }
      if (selectedOption === idx && option !== word.word) {
        return "bg-red-500 border-red-500"; // 선택했지만 오답인 경우 빨간색 원
      }
      return "border-gray-300";
    }
    
    return selectedOption === idx ? "bg-blue-500 border-blue-500" : "border-gray-300";
  };

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
                          <div className="inline-block border-2 border-gray p-1">
                            <span className="font-bold text-blue-600">
                              {showCorect ? word.word: <span className="opacity-0">{word.word}</span>}
                            </span>
                          </div>
                      )}
                  </Fragment>
              ))}
          </div>
          <div className="text-gray-600 border-t border-gray-100 pt-4">
              {word.example.context}
          </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="space-y-4">
          {options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => !showCorect && setSelectedOption(idx)}
              className={`w-full flex items-center gap-4 p-4 text-left border rounded-lg transition-all ${getButtonStyle(option, idx)}`}
              disabled={showCorect}
            >
              <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${getCircleStyle(option, idx)}`}>
                {(selectedOption === idx || (showCorect && option === word.word)) && 
                  <Check size={16} className="text-white" />
                }
                {selectedOption !== idx && !showCorect && 
                  <span className="text-gray-500">{idx + 1}</span>
                }
              </div>
              <span className="text-lg">{option}</span>
            </button>
          ))}
        </div>
      </div>
      <button
          onClick={onNext}
          className={`w-full py-4 text-white rounded-xl text-lg font-medium transition-all
            ${selectedOption === null? 'bg-gray-300 cursor-now-allowed': 'bg-green-500 hover:bg-green-600 active:scale-[0.98]'}`}
      >
          {index === 1 ? "결과 확인": "다음 단어"}
      </button>
  </div>
  )
}