"use client"

import { BookOpen, Check } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { Example, Quiz, Word } from "@/model/Word";

type Props = {
  correctIds: number[];
  setCorrectIds: (correctIds: number[] | ((prev: number[]) => number[])) => void;
  setIncorrectIds: (incorrectIds: number[] | ((prev: number[]) => number[])) => void;
  index: number;
  word: Word;
  wordsLength: number;
  handleQuizNext: () => void;
  onScrollUp: () => void;
}

export default function QuizStep({index, word, wordsLength, correctIds, handleQuizNext, onScrollUp, setCorrectIds, setIncorrectIds }: Props) {
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

      if(correctIds.includes(word.id)) {
        setShowCorrect(true);
      }
    }
  }, [word, correctIds]);

  const onCheck = () => {
    onScrollUp();
    setShowCorrect(true);
    if(word.word === options[selectedOption!]) { //정답을 선택했다면
      setCorrectIds(prev => [...prev, word.id]);
    } else { //오답을 선택했다면
      setIncorrectIds(prev => [...prev, word.id]);
    }
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
    
    // 이미 푼 문제라면 (correctIds에 있다면) 정답만 초록색으로
    if (correctIds.includes(word.id)) {
      return option === word.word ? "bg-green-100" : "";
    }
    
    // 아직 안 푼 문제라면 기존 로직대로
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
      // 이미 푼 문제라면 (correctIds에 있다면) 정답에만 체크 표시
      if (correctIds.includes(word.id)) {
        if (option === word.word) {
          return "bg-green-500 border-green-500"; // 정답인 경우 초록색 원
        }
        return "border-gray-300";
      }
      
      // 아직 안 푼 문제라면 기존 로직대로
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
            ${selectedOption === null && !correctIds.includes(word.id)
              ? 'bg-gray-300 cursor-not-allowed' 
              : showCorect && (index === wordsLength - 1 || correctIds.includes(word.id))
                  ? 'bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 active:scale-[0.98]'
                  : 'bg-green-500 hover:bg-green-600 active:scale-[0.98]'
            }`}
          disabled={selectedOption === null && !correctIds.includes(word.id)}
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