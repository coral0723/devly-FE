import { Knowledge } from "@/model/Knowledge";
import { Check, Code, Lightbulb, BookOpen, FileCode2 } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  knowledge: Knowledge;
  knowledgesLength: number;
  currentStep: number;
  handleNext: () => void;
}

export default function KnowledgeStep({knowledge, knowledgesLength, currentStep, handleNext}: Props) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showCorect, setShowCorrect] = useState<boolean>(false);
  const [options, setOptions] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('concept');

  useEffect(() => {
    if (knowledge) {
      setActiveTab('concept');
      setOptions(knowledge.practice.options);
    }
  }, [knowledge]);

  const onCheck = () => {
    setShowCorrect(true);
  }

  const onNext = () => {
    if(currentStep < knowledgesLength - 1) {
      setShowCorrect(false);
      setSelectedOption(null);
    }
    handleNext();
  }

  const getButtonStyle = (option: string, idx: number) => {
    if (!showCorect) {
      return "hover:bg-gray-50";
    }
    
    if (option === knowledge.practice.options[knowledge.practice.answer-1]) {
      return "bg-green-100";
    }
    
    if (selectedOption === idx && option !== knowledge.practice.options[knowledge.practice.answer-1]) {
      return "bg-red-100";
    }
    
    return "";
  };

  const getCircleStyle = (option: string, idx: number) => {
    if (showCorect) {
      if (option === knowledge.practice.options[knowledge.practice.answer-1]) {
        return "bg-green-500 border-green-500";
      }
      if (selectedOption === idx && option !== knowledge.practice.options[knowledge.practice.answer-1]) {
        return "bg-red-500 border-red-500";
      }
      return "border-gray-300";
    }
    
    return selectedOption === idx ? "bg-blue-500 border-blue-500" : "border-gray-300";
  };
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Topic Header with Progress */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-2xl font-bold flex-1">{knowledge.title}</h1>
          <span className="text-sm text-gray-500 flex-shrink-0">
            {currentStep + 1} / {knowledgesLength}
          </span>
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
                <p className="text-blue-900">{knowledge.practice.question || "주어진 코드를 보고 알맞은 답을 선택하세요."}</p>
              </div>

              <div className="space-y-4">
                {knowledge.practice.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() =>!showCorect && setSelectedOption(idx)}
                    className={`w-full flex items-center gap-4 p-4 text-left border rounded-lg transition-all ${getButtonStyle(option, idx)}`}
                    disabled={showCorect}
                  >
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${getCircleStyle(option, idx)}`}>
                      {(selectedOption === idx || (showCorect && option === options[knowledge.practice.answer-1])) && 
                        <Check size={16} className="text-white" />
                      }
                      {selectedOption !== idx && !showCorect && 
                        <span className="text-gray-500">{idx + 1}</span>
                      }
                    </div>
                    <span className="text-base">{option}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={showCorect ? onNext : onCheck}
                className={`w-full py-4 mb-4 text-white rounded-xl text-lg font-medium transition-all
                  ${selectedOption === null 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : showCorect && currentStep === knowledgesLength - 1
                        ? 'bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/50 border-2 border-blue-400 active:scale-[0.98]'
                        : 'bg-green-500 hover:bg-green-600 active:scale-[0.98]'
                  }`}
                disabled={selectedOption === null}
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
          )}
        </div>
      </div>
    </div>
  )
}