"use client"

import WhiteBox from "@/app/_component/WhiteBox";
import { Distractor } from "@/model/knowledge/Distractor";
import { Knowledge } from "@/model/knowledge/Knowledge";
import { Check, Code, Lightbulb, BookOpen, FileCode2 } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  setCorrectIds: (correctIds: number[] | ((prev: number[]) => number[])) => void;
  setIncorrectIds: (incorrectIds: number[] | ((prev: number[]) => number[])) => void;
  knowledge: Knowledge;
  knowledgesLength: number;
  currentStep: number;
  handleNext: () => void;
  onScrollUp: () => void;
}

export default function KnowledgeStep({knowledge, knowledgesLength, currentStep, handleNext, setCorrectIds, setIncorrectIds, onScrollUp}: Props) {
  const [selectedDistractor, setSelectedDistractor] = useState<Distractor | null>(null);
  const [showCorect, setShowCorrect] = useState<boolean>(false);
  const [distractors, setDistractors] = useState<Distractor[]>([]);
  const [activeTab, setActiveTab] = useState('concept');

  useEffect(() => {
    if (knowledge) {
      setActiveTab('concept');
      const updatedDistractors = [...knowledge.quiz.distractors];
      updatedDistractors.sort(() => Math.random() - 0.5);
      setDistractors(updatedDistractors);
    }
  }, [knowledge]);

  const onCheck = () => {
    onScrollUp();
    setShowCorrect(true);
    if(selectedDistractor && knowledge.quiz.answer === selectedDistractor.id) { //정답을 선택했다면
      setCorrectIds(prev => [...prev, knowledge.id]);
    } else { //오답을 선택했다면
      setIncorrectIds(prev => [...prev, knowledge.id]);
    }
  }

  const onNext = () => {
    if(currentStep < knowledgesLength - 1) {
      setShowCorrect(false);
      setSelectedDistractor(null);
    }
    handleNext();
  }

  const getButtonStyle = (distractor: Distractor) => {
    if (!showCorect) {
      return "hover:bg-gray-50";
    }
    
    if (distractor.id === knowledge.quiz.answer) {
      return "bg-green-100";
    }
    
    if (selectedDistractor!.id === distractor.id && selectedDistractor!.id !== knowledge.quiz.answer) {
      return "bg-red-100";
    }
    
    return "";
  };

  const getCircleStyle = (distractor: Distractor) => {
    if (showCorect) {
      if (distractor.id === knowledge.quiz.answer) {
        return "bg-green-500 border-green-500";
      }
      if (selectedDistractor && selectedDistractor.id === distractor.id && distractor.id !== knowledge.quiz.answer) {
        return "bg-red-500 border-red-500";
      }
      return "border-gray-300";
    }
    
    return selectedDistractor && selectedDistractor.id === distractor.id ? "bg-blue-500 border-blue-500" : "border-gray-300";
  };
  
  return (
    <>
      {/* Topic Header with Progress */}
      <WhiteBox className="mb-[68px]">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-lg md:text-2xl font-bold flex-1">{knowledge.title}</h1>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex border-b">
          <div
            className={`flex-1 flex justify-center rounded-t-lg
              ${activeTab === 'concept' ? 'bg-blue-50 border-b-2 border-blue-500' : 'hover:text-gray-700 hover:bg-gray-50'}`}
          >
            <button
              onClick={() => setActiveTab('concept')}
              className={`flex items-center p-2 space-x-2 text-sm md:text-base font-medium transition-colors
                ${activeTab === 'concept' 
                  ? 'text-blue-600' 
                  : 'text-gray-500'}`}
            >
              <Lightbulb className="w-4 h-4 md:w-5 md:h-5" />
              <span>개념</span>
            </button>
          </div>
          <div
            className={`flex-1 flex justify-center rounded-t-lg
              ${activeTab === 'example' ? 'bg-blue-50 border-b-2 border-blue-500' : 'hover:text-gray-700 hover:bg-gray-50'}`}
          >
            <button
              onClick={() => setActiveTab('example')}
              className={`flex items-center p-2 space-x-2 text-sm md:text-base font-medium rounded-t-lg transition-colors
                ${activeTab === 'example' 
                  ? 'text-blue-600' 
                  : 'text-gray-500'}`}
            >
              <FileCode2 className="w-4 h-4 md:w-5 md:h-5" />
              <span>코드</span>
            </button>
          </div>
          <div
            className={`flex-1 flex justify-center rounded-t-lg
              ${activeTab === 'practice' ? 'bg-blue-50 border-b-2 border-blue-500' : 'hover:text-gray-700 hover:bg-gray-50'}`}
          >
            <button
              onClick={() => setActiveTab('practice')}
              className={`flex items-center p-2 space-x-2 text-sm md:text-base font-medium rounded-t-lg transition-colors
                ${activeTab === 'practice' 
                  ? 'text-blue-600' 
                  : 'text-gray-500'}`}
            >
              <BookOpen className="w-4 h-4 md:w-5 md:h-5"/>
              <span>문제</span>
            </button>
          </div>
        </div>

        {/* Content Based on Active Tab */}
        <div className="mt-4">
          {activeTab === 'concept' && (
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">{knowledge.content}</p>
            </div>
          )}

          {activeTab === 'example' && (
            <div className="space-y-4">
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs md:text-sm text-gray-400">예시 코드</span>
                  <div className="flex items-center space-x-2">
                    <Code className="text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
                <pre className="overflow-x-auto text-xs md:text-sm">
                  <code>{knowledge.code}</code>
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'practice' && (
            <div className="space-y-4 mb-">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                <h2 className="md:text-lg font-semibold text-blue-800 mb-2">문제</h2>
                <p className="text-blue-900 text-sm md:text-base">{knowledge.quiz.text || "주어진 코드를 보고 알맞은 답을 선택하세요."}</p>
              </div>

              <div className="space-y-4">
                {distractors.map((distractor, idx) => (
                  <button
                    key={distractor.id}
                    onClick={() => !showCorect && setSelectedDistractor(distractor)}
                    className={`w-full flex items-center gap-4 p-4 text-left border rounded-lg transition-all ${getButtonStyle(distractor)}`}
                    disabled={showCorect}
                  >
                    <div className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full border-2 flex-shrink-0 ${getCircleStyle(distractor)}`}>
                      {(showCorect && distractor.id === knowledge.quiz.answer) && 
                        <Check className="text-white w-3 h-3 md:w-4 md:h-4" />
                      }
                      {(showCorect && selectedDistractor && selectedDistractor.id === distractor.id && distractor.id !== knowledge.quiz.answer) && 
                        <Check className="text-white w-3 h-3 md:w-4 md:h-4" />
                      }
                      {(selectedDistractor && selectedDistractor.id === distractor.id && !showCorect) && 
                        <Check className="text-white w-3 h-3 md:w-4 md:h-4" />
                      }
                      {(!selectedDistractor || selectedDistractor.id !== distractor.id) && !showCorect && 
                        <span className="text-gray-500">{idx + 1}</span>
                      }
                    </div>
                    <span className="md:text-lg">{distractor.distractor}</span>
                  </button>
                ))}
              </div>

            </div>
          )}
        </div>
      </WhiteBox>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-2 border border-gray-200 z-10">
        <div className="max-w-xl mx-auto">
          <button
            onClick={showCorect ? onNext : onCheck}
            className={`w-full py-3 text-white rounded-xl md:text-lg font-medium transition-all
              ${selectedDistractor === null 
                ? 'bg-gray-300 cursor-not-allowed' 
                : showCorect && currentStep === knowledgesLength - 1
                    ? 'bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-500 hover:to-blue-700 active:scale-[0.98]'
                    : 'bg-blue-500 hover:bg-blue-600 active:scale-[0.98]'
              }`}
            disabled={selectedDistractor === null}
          >
            {showCorect ? (
              currentStep === knowledgesLength - 1 ? (
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
    </>
  )
}