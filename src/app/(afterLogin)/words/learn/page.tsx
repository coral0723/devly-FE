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
import LoadingSpinner from "@/app/_component/LoadingSpinner";
import { ValidationResult } from "@/model/ValidationResult";
import { getValidationWordsResult } from "../_lib/getValidationWordsResult";
import { authApi } from "@/app/_lib/axios";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getReviewWords } from "../_lib/getReviewWords";

type Props = {
  isReview?: boolean;
}

export default function WordLearnPage({isReview = false}: Props) {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [step, setStep] = useState<'word' | 'context' | 'quiz'>('word');
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [showCompletion, setShowCompletion] = useState<boolean>(false);
  const [correctIds, setCorrectIds] = useState<number[]>([]);
  const [incorrectIds, setIncorrectIds] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const studyId = searchParams.get('studyId');
  
  const {data: words, isLoading, refetch: wordsRefetch} = useQuery<Word[], object, Word[], [_1: string, _2: string, string]>({
    queryKey: ['words', isReview ? 'review' : 'learn', studyId!],
    queryFn: isReview ? getReviewWords : getWords,
    staleTime: 0,
    refetchOnMount: 'always',
  });
  
  const {data: validationResult, refetch: validationRefetch} = useQuery<ValidationResult, object, ValidationResult, [_1: string, _2: string, string]>({
    queryKey: ['words', 'validation', studyId!],
    queryFn: getValidationWordsResult,
    staleTime: 0,
    refetchOnMount: 'always',
    enabled: !isReview,
  });

  // 학습이 필요한 단어만 필터링
  const filteredWords = isReview
    ? words || []
    : validationResult?.incorrectIds.length === 0
      ? words || []
      : words?.filter(word => validationResult?.incorrectIds.includes(word.id)) || [];

  const onScrollUp = () => {
    containerRef.current?.scrollTo(0, 0);
  };

  const handleNext = () => {
    if (currentWordIndex < filteredWords!.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setStep('word');
    } else {
      setCurrentWordIndex(0);
      setStep('quiz');
    }
  };

  const handleQuizNext = async () => {
    if(currentWordIndex < filteredWords!.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else if(isReview) { //복습 페이지인 경우 다 풀었을 때 api 요청 보내지 않음
      setShowCompletion(true);
    } else {
      try {
        //msw용
        // const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/studies/${studyId}/words/review`, {
        //   correctIds: correctIds
        // });

        const endPoint = `/api/studies/${studyId}/words/review`;
        const method = validationResult?.correctIds.length === 0 ? 'post' : 'put';
        const payload = validationResult?.correctIds.length === 0 
          ? {correctIds, incorrectIds}
          : {correctIds}; 

        const res = await authApi[method](endPoint, payload);

        if(res.status === 200) {
          setShowCompletion(true);
        }
      } catch (error) {
        console.error('Failed to submit review:', error);
        alert("오류가 발생하였습니다.");
        router.replace('/home');
      }
    }
  }

  if(isLoading || !words || (!isReview && !validationResult)) {
    return (
      <div className="flex max-w-lg mx-auto min-h-screen bg-gray-50 items-center justify-center">
        <LoadingSpinner size="md"/>
      </div>
    )
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
              {currentWordIndex + 1} / {filteredWords.length}
            </span>
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${((currentWordIndex + 1) / filteredWords.length) * 100}%`}}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div ref={containerRef} className="p-5 h-[calc(100vh-150px)] overflow-y-auto scrollbar-hide">
        {step === 'word' && (
          <WordStep 
            word={filteredWords[currentWordIndex]} 
            onNext={() => setStep('context')} 
          />
        )}

        {step === 'context' && (
          <ContextStep
            index={currentWordIndex}
            word={filteredWords[currentWordIndex]}
            wordsLength={filteredWords.length}
            onNext={() => {
              handleNext()
            }}
          />
        )}

        {step === 'quiz' && (
          <QuizStep
            setCorrectIds={setCorrectIds}
            setIncorrectIds={setIncorrectIds}
            index={currentWordIndex}
            word={filteredWords[currentWordIndex]}
            wordsLength={filteredWords.length}
            handleQuizNext={handleQuizNext}
            onScrollUp={onScrollUp}
          />
        )}
      </div>

      {showExitConfirm && (
          <ExitConfirmModal onClose={() => setShowExitConfirm(false)} />
      )}

      {showCompletion && (
          <CompletionModal
            isReview={isReview} 
            incorrectIds={incorrectIds}
            onClose={() => {
              validationRefetch();
              wordsRefetch();
              router.replace(isReview ? '/review' : '/home');
            }}
          />
      )}
    </div>
  );
}