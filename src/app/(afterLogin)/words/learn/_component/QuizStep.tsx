"use client"

import { BookOpen, Check } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { Example, Quiz, Word } from "@/model/Word";

type Props = {
  setCorrectIds: (correctIds: number[] | ((prev: number[]) => number[])) => void;
  setIncorrectIds: (incorrectIds: number[] | ((prev: number[]) => number[])) => void;
  index: number;
  word: Word;
  wordsLength: number;
  handleQuizNext: () => void;
  onScrollUp: () => void;
}

export default function QuizStep({ index, word, wordsLength, handleQuizNext, onScrollUp, setCorrectIds, setIncorrectIds }: Props) {
  const [selectedDistractor, setSelectedDistractor] = useState<number | null>(null);
  const [showCorrect, setShowCorrect] = useState<boolean>(false);
  const [distractors, setDistractors] = useState<string[]>([]);

  const example: Example = JSON.parse(word.example);
  const quiz: Quiz = JSON.parse(word.quiz);

  useEffect(() => {
    if (word) {
      // 새로운 `word` 데이터를 기반으로 distractors 생성
      const updatedDistractors = [...quiz.distractors, word.word];
      // 배열을 무작위로 섞기
      updatedDistractors.sort(() => Math.random() - 0.5);

      setDistractors(updatedDistractors);
    }
  }, [word]);

  const onCheck = () => {
    onScrollUp();
    setShowCorrect(true);
    if(word.word === distractors[selectedDistractor!]) { //정답을 선택했다면
      setCorrectIds(prev => [...prev, word.id]);
    } else { //오답을 선택했다면
      setIncorrectIds(prev => [...prev, word.id]);
    }
  }

  const onNext = () => {
    onScrollUp();
    if(index < wordsLength - 1) {
      setShowCorrect(false);
      setSelectedDistractor(null);
    }
    handleQuizNext();
  }

  const getButtonStyle = (distractor: string, idx: number) => {
    if (!showCorrect) {
      return "hover:bg-gray-50";
    }
    
    //정답 여부 체크
    if (distractor === word.word) {
      return "bg-green-100"; // 정답인 경우
    }
    if (selectedDistractor === idx && distractor !== word.word) {
      return "bg-red-100"; // 오답인 경우
    }
    
    return "";
  };

  const getCircleStyle = (distractor: string, idx: number) => {
    if (showCorrect) {
      //정답 여부 체크
      if (distractor === word.word) {
        return "bg-green-500 border-green-500"; // 정답인 경우 초록색 원
      }
      if (selectedDistractor === idx && distractor !== word.word) {
        return "bg-red-500 border-red-500"; // 오답인 경우 빨간색 원
      }
      return "border-gray-300";
    }
    
    return selectedDistractor === idx ? "bg-blue-500 border-blue-500" : "border-gray-300";
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
                          {showCorrect ? part : <span className="opacity-0">{part}</span>}
                        </span>
                      </div>
                    ) : part}
                  </Fragment>
              ))}
          </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="space-y-4">
          {distractors.map((distractor, idx) => (
            <button
              key={idx}
              onClick={() => !showCorrect && setSelectedDistractor(idx)}
              className={`w-full flex items-center gap-4 p-4 text-left border rounded-lg transition-all ${getButtonStyle(distractor, idx)}`}
              disabled={showCorrect}
            >
              <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${getCircleStyle(distractor, idx)}`}>
                {(selectedDistractor === idx || (showCorrect && distractor === word.word)) && 
                  <Check size={16} className="text-white" />
                }
                {selectedDistractor !== idx && !showCorrect && 
                  <span className="text-gray-500">{idx + 1}</span>
                }
              </div>
              <span className="text-lg">{distractor}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="fixed w-full max-w-lg bottom-0 bg-white p-2 left-1/2 transform -translate-x-1/2 border border-gray-200 z-10">
        <button
          onClick={showCorrect ? onNext : onCheck}
          className={`w-full py-3 text-white text-lg font-medium rounded-xl transition-all
            ${selectedDistractor === null 
              ? 'bg-gray-300 cursor-not-allowed' 
              : showCorrect && index === wordsLength - 1
                  ? 'bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 active:scale-[0.98]'
                  : 'bg-green-500 hover:bg-green-600 active:scale-[0.98]'
            }`}
          disabled={selectedDistractor === null}
        >
          {showCorrect ? (
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