import { Distractor, Knowledge } from "@/model/Knowledge";
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Topic Header with Progress */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-2xl font-bold flex-1">{knowledge.title}</h1>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex space-x-1 border-b">
          <button
            onClick={() => setActiveTab('concept')}
            className={`flex items-center px-4 py-2 space-x-2 text-sm font-medium rounded-t-lg transition-colors
              ${activeTab === 'concept' 
                ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-500' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          >
            <Lightbulb size={16} />
            <span>개념</span>
          </button>
          <button
            onClick={() => setActiveTab('example')}
            className={`flex items-center px-4 py-2 space-x-2 text-sm font-medium rounded-t-lg transition-colors
              ${activeTab === 'example' 
                ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-500' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          >
            <FileCode2 size={16} />
            <span>예시 코드</span>
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`flex items-center px-4 py-2 space-x-2 text-sm font-medium rounded-t-lg transition-colors
              ${activeTab === 'practice' 
                ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-500' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          >
            <BookOpen size={16} />
            <span>실습 문제</span>
          </button>
        </div>

        {/* Content Based on Active Tab */}
        <div className="mt-4">
          {activeTab === 'concept' && (
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed">{knowledge.content}</p>
            </div>
          )}

          {activeTab === 'example' && (
            <div className="space-y-4">
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">예시 코드</span>
                  <div className="flex items-center space-x-2">
                    <Code size={16} className="text-gray-400" />
                  </div>
                </div>
                <pre className="overflow-x-auto text-sm">
                  <code>{knowledge.code}</code>
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'practice' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                <h2 className="text-lg font-semibold text-blue-800 mb-2">문제</h2>
                <p className="text-blue-900">{knowledge.quiz.text || "주어진 코드를 보고 알맞은 답을 선택하세요."}</p>
              </div>

              <div className="space-y-4">
                {distractors.map((distractor, idx) => (
                  <button
                    key={distractor.id}
                    onClick={() => !showCorect && setSelectedDistractor(distractor)}
                    className={`w-full flex items-center gap-4 p-4 text-left border rounded-lg transition-all ${getButtonStyle(distractor)}`}
                    disabled={showCorect}
                  >
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${getCircleStyle(distractor)}`}>
                      {(showCorect && distractor.id === knowledge.quiz.answer) && 
                        <Check size={16} className="text-white" />
                      }
                      {(showCorect && selectedDistractor && selectedDistractor.id === distractor.id && distractor.id !== knowledge.quiz.answer) && 
                        <Check size={16} className="text-white" />
                      }
                      {(selectedDistractor && selectedDistractor.id === distractor.id && !showCorect) && 
                        <Check size={16} className="text-white" />
                      }
                      {(!selectedDistractor || selectedDistractor.id !== distractor.id) && !showCorect && 
                        <span className="text-gray-500">{idx + 1}</span>
                      }
                    </div>
                    <span className="text-base">{distractor.distractor}</span>
                  </button>
                ))}
              </div>

              <div className="fixed w-full max-w-lg left-1/2 transform -translate-x-1/2 bottom-0 bg-white p-2 border border-gray-200 z-10">
                <button
                  onClick={showCorect ? onNext : onCheck}
                  className={`w-full py-3 text-white rounded-xl text-lg font-medium transition-all
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
          )}
        </div>
      </div>
    </div>
  )
}