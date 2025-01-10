"use client"

import { useState } from "react";
import { FeedbackData } from "./types";
import { WORDS_DATA } from "./words";
import { WordStep } from "./_component/WordStep";
import { ExitConfirmModal } from "./_component/ExitConfirmModal";
import { CompletionModal } from "./_component/CompletionModal";
import { X } from "lucide-react";
import { ContextStep } from "./_component/ContextStep";
import { FeedbackStep } from "./_component/FeedbackStep";
import QuizStep from "./_component/QuizStep";

export default function WordLearning() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [step, setStep] = useState<'word' | 'context' | 'quiz' | 'feedback'>('word');
    const [feedback, setFeedback] = useState<FeedbackData | null>(null);
    const [completedWords, setCompletedWords] = useState(0);
    const [showExitConfirm, setShowExitConfirm] = useState(false);
    const [showCompletion, setShowCompletion] = useState(false);

    const currentWord = WORDS_DATA[currentWordIndex];

    const handleNext = () => {
        if (currentWordIndex < WORDS_DATA.length - 1) {
            setCurrentWordIndex(prev => prev + 1);
            setStep('word');
            setFeedback(null);
        } else {
            // setShowCompletion(true);
            setCompletedWords(0);
            setCurrentWordIndex(0);
            setStep('quiz');
        }
    };

    const handleQuizNext = () => {
      if(currentWordIndex < WORDS_DATA.length - 1) {
        setCurrentWordIndex(prev => prev + 1);
      } else {
        setShowCompletion(true);
      }
    }

    return (
        <div className="max-w-lg mx-auto min-h-screen bg-gray-50">
            {/* Progress Header */}
            <div className="sticky top-0 z-10 bg-white shadow-sm">
              <div className="px-5 py-3">
                <div className="grid grid-cols-3 items-center">
                  <button
                      onClick={() => setShowExitConfirm(true)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full"
                  >
                    <X size={24}/>
                  </button>
                  <div className="flex flex-col items-center">
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all"
                        style={{width: `${(completedWords / WORDS_DATA.length) * 100}%`}}
                      />
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {completedWords}/{WORDS_DATA.length} {step==="quiz"? "문제": "단어"}
                    </div>
                  </div>
                  <div className="w-10"/>
                  {/* 균형을 위한 빈 공간 */}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-5">
                {step === 'word' && (
                    <WordStep 
                        word={currentWord} 
                        onNext={() => setStep('context')} 
                    />
                )}

                {step === 'context' && (
                  <ContextStep
                    index={currentWordIndex}
                    word={currentWord}
                    onNext={() => {
                      setCompletedWords(prev => prev + 1);
                      handleNext()
                    }}
                  />
                )}

                {step === 'quiz' && (
                  <QuizStep
                    index={currentWordIndex}
                    word={currentWord}
                    onNext={() => {
                      setCompletedWords(prev => prev + 1);
                      handleQuizNext()
                    }}
                    />
                )}

                {/* {step === 'feedback' && feedback && (
                  <FeedbackStep
                    feedback={feedback}
                    onNext={() => {
                        setCompletedWords(prev => prev + 1);
                        handleNext();
                    }}
                  />
                )} */}
            </div>

            {showExitConfirm && (
                <ExitConfirmModal onClose={() => setShowExitConfirm(false)} />
            )}

            {showCompletion && (
                <CompletionModal totalWords={WORDS_DATA.length} />
            )}
        </div>
    );
}