"use client"

import { useState, useRef } from "react";
import { WordStep } from "./_component/WordStep";
import { ExitConfirmModal } from "./_component/ExitConfirmModal";
import { CompletionModal } from "./_component/CompletionModal";
import { X } from "lucide-react";
import { ContextStep } from "./_component/ContextStep";
import QuizStep from "./_component/QuizStep";
import { useQuery } from "@tanstack/react-query";
import { Word } from "@/model/Word";
import { useSearchParams } from "next/navigation";
import { getWords } from "../_lib/getWords";

export default function WordLearning() {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [step, setStep] = useState<'word' | 'context' | 'quiz'>('word');
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [showCompletion, setShowCompletion] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const searchParams = useSearchParams();
  const groupId = searchParams.get('groupId');
  
  const {data: words} = useQuery<Word[], object, Word[], [_1: string, _2: string, string]>({
    queryKey: ['words', 'learn', groupId!],
    queryFn: getWords,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const onScrollUp = () => {
    containerRef.current?.scrollTo(0, 0);
  };

  const handleNext = () => {
    if (currentWordIndex < words!.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setStep('word');
    } else {
      setCurrentWordIndex(0);
      setStep('quiz');
    }
  };

  const handleQuizNext = () => {
    if(currentWordIndex < words!.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      setShowCompletion(true);
    }
  }

  return (
      <div className="relative max-w-lg mx-auto min-h-screen bg-gray-50">
          {/* Progress Header */}
          <div className="sticky top-0 z-20 bg-white border-b border-gray-200">
            <div className="px-4 py-2">
              <div className="flex items-center justify-between mb-2">
                <button
                    onClick={() => setShowExitConfirm(true)}
                    className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={24}/>
                </button>
                <span className="text-sm text-gray-500">
                  {currentWordIndex + 1} / {words!.length}
                </span>
              </div>
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${((currentWordIndex + 1) / words!.length) * 100}%`}}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div ref={containerRef} className="p-5 h-[calc(100vh-64px)] overflow-y-auto scrollbar-hide">
            {step === 'word' && (
              <WordStep 
                word={words![currentWordIndex]} 
                onNext={() => setStep('context')} 
              />
            )}

            {step === 'context' && (
              <ContextStep
                index={currentWordIndex}
                word={words![currentWordIndex]}
                wordsLength={words!.length}
                onNext={() => {
                  handleNext()
                }}
              />
            )}

            {step === 'quiz' && (
              <QuizStep
                index={currentWordIndex}
                word={words![currentWordIndex]}
                wordsLength={words!.length}
                handleQuizNext={handleQuizNext}
                onScrollUp={onScrollUp}
                />
            )}
          </div>

          {showExitConfirm && (
              <ExitConfirmModal onClose={() => setShowExitConfirm(false)} />
          )}

          {showCompletion && (
              <CompletionModal totalWords={words!.length} />
          )}
      </div>
  );
}