"use client"

import { BookOpen, Check } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { Example, Quiz, Word } from "@/model/Word";
import { ValidationResult } from "@/model/ValidationResult";

type Props = {
  validationResult: ValidationResult
  index: number;
  word: Word;
  wordsLength: number;
  handleQuizNext: () => void;
  onScrollUp: () => void;
}

export default function QuizStep({index, word, wordsLength, handleQuizNext, onScrollUp }: Props) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showCorect, setShowCorrect] = useState<boolean>(false);
  const [options, setOptions] = useState<string[]>([]);

  const example: Example = JSON.parse(word.example);
  const quiz: Quiz = JSON.parse(word.quiz);

  useEffect(() => {
    if (word) {
      // 새로운 `word` 데이터를 기반으로 options 생성
      const updatedOptions = [...quiz.distractors, word.word];
      // 배열을 무작위로 섞기
      updatedOptions.sort(() => Math.random() - 0.5);
      // 상태 업데이트
      setOptions(updatedOptions);
    }
  }, [word]);

  const onCheck = () => {
    onScrollUp();
    setShowCorrect(true);
  }

  const onNext = () => {
    onScrollUp();
    if(index < wordsLength - 1) {
      setShowCorrect(false);
      setSelectedOption(null);
    }
    handleQuizNext();
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
              <span>출처: {example.source}</span>
          </div>
          <div className="text-lg mb-4 font-mono">
              {example.text.split(new RegExp(`(${word.word})`, 'i')).map((part, i) => (
                  <Fragment key={i}>
                    {part.toLowerCase() === word.word.toLowerCase() ? (
                      <div className="inline-block border-2 border-gray p-1">
                        <span className="font-bold text-blue-600">
                          {showCorect ? part : <span className="opacity-0">{part}</span>}
                        </span>
                      </div>
                    ) : part}
                  </Fragment>
              ))}
          </div>
          <div className="text-gray-600 border-t border-gray-100 pt-4">
              {example.translation}
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

      <div className="fixed w-full max-w-lg bottom-0 bg-white p-2 left-1/2 transform -translate-x-1/2 border border-gray-200 z-10">
        <button
          onClick={showCorect ? onNext : onCheck}
          className={`w-full py-3 text-white text-lg font-medium rounded-xl transition-all
            ${selectedOption === null 
              ? 'bg-gray-300 cursor-not-allowed' 
              : showCorect && index === wordsLength - 1
                  ? 'bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 active:scale-[0.98]'
                  : 'bg-green-500 hover:bg-green-600 active:scale-[0.98]'
            }`}
          disabled={selectedOption === null}
        >
          {showCorect ? (
            index === wordsLength - 1 ? (
              <div className="flex items-center justify-center gap-2">
                <span>학습 끝내기</span>
              </div>
            ) : (
              "다음 문제"
            )
          ) : (
            "결과 확인"
          )}
        </button>
      </div>
    </div>
  )
}