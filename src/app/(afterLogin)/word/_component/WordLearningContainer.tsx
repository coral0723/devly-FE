"use client"

import { Word } from "@/model/word/Word";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { getWords } from "../_lib/getWords";
import { getValidationWordResult } from "../_lib/getValidationWordResult";
import { ValidationResult } from "@/model/ValidationResult";
import { authApi } from "@/app/_lib/axios";
import LoadingSpinner from "@/app/_component/LoadingSpinner";
import Header from "./Header";
import { WordStep } from "./WordStep";
import { ContextStep } from "./ContextStep";
import QuizStep from "./QuizStep";
import { ExitConfirmModal } from "./ExitConfirmModal";
import { CompletionModal } from "./CompletionModal";
import axios from "axios";

type Props = {
  isReview: boolean;
}

export default function WordLearningContainer({ isReview }: Props) {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [step, setStep] = useState<'word' | 'context' | 'quiz'>('word');
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [showCompletion, setShowCompletion] = useState<boolean>(false);
  const [correctIds, setCorrectIds] = useState<number[]>([]);
  const [incorrectIds, setIncorrectIds] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const studyId = useSearchParams().get('studyId');
  
  const {data: words, isLoading, refetch: wordsRefetch} = useQuery<Word[], object, Word[], [_1: string, _2: string, string]>({
    queryKey: ['word', 'learn', studyId!],
    queryFn: getWords,
    staleTime: 0,
    refetchOnMount: 'always',
  });
  
  const {data: validationResult, refetch: validationRefetch} = useQuery<ValidationResult, object, ValidationResult, [_1: string, _2: string, string]>({
    queryKey: ['word', 'validation', studyId!],
    queryFn: getValidationWordResult,
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
        const useMock = process.env.NEXT_PUBLIC_USE_MSW_WORD === 'true';
        let response;

        if(useMock) {
          response = await axios.put(`/mock/studies/${studyId}/words/review`, {
            correctIds: correctIds
          });
        } else {
          const endPoint = `/api/words/review/study/${studyId}`;
          const payload = validationResult?.correctIds.length === 0 
            ? {correctIds, incorrectIds}
            : {correctIds}; 
  
          response = await authApi.put(endPoint, payload);
        }

        if(response.status === 200) {
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
      <Header
        currentWordIndex={currentWordIndex}
        wordsLength={filteredWords.length}
        onExit={() => setShowExitConfirm(true)}
      />

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
            index={currentWordIndex}
            word={filteredWords[currentWordIndex]}
            wordsLength={filteredWords.length}
            setCorrectIds={setCorrectIds}
            setIncorrectIds={setIncorrectIds}
            handleQuizNext={handleQuizNext}
            onScrollUp={onScrollUp}
          />
        )}
      </div>

      {showExitConfirm && (
        <ExitConfirmModal 
          isReview={isReview}
          onClose={() => setShowExitConfirm(false)} 
        />
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