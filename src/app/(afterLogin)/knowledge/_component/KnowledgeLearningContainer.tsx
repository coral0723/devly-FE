"use client"

import { Knowledge } from "@/model/knowledge/Knowledge";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { getKnowledges } from "../_lib/getKnowledges";
import { ValidationResult } from "@/model/ValidationResult";
import { getValidationKnowledgeResult } from "../_lib/getValidationKnowledgeResult";
import axios from "axios";
import LoadingSpinner from "@/app/_component/LoadingSpinner";
import Header from "./Header";
import KnowledgeStep from "./KnowledgeStep";
import ExitConfirmModal from "./ExitConfirmModal";
import CompletionModal from "./CompletionModal";
import { authApi } from "@/app/_lib/axios";

type Props = {
  isReview: boolean;
}

export default function KnowledgeLearningContainer({ isReview }: Props) {
  const [currentKnowledgeIndex, setCurrentKnowledgeIndex] = useState<number>(0);
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [showCompletion, setShowCompletion] = useState<boolean>(false);
  const [correctIds, setCorrectIds] = useState<number[]>([]);
  const [incorrectIds, setInCorrectIds] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const studyId = useSearchParams().get('studyId');

  const {data: knowledges, isLoading, refetch: knowledgeRefetch} = useQuery<Knowledge[], object, Knowledge[], [_1: string, _2: string, string]>({
    queryKey: ['knowledge', 'learn', studyId!],
    queryFn: getKnowledges,
    staleTime: 0,
    refetchOnMount: 'always',
  });

  const {data: validationResult, refetch: validationRefetch} = useQuery<ValidationResult, object, ValidationResult, [_1: string, _2: string, string]>({
    queryKey: ['knowledge', 'validation', studyId!],
    queryFn: getValidationKnowledgeResult,
    staleTime: 0,
    refetchOnMount: 'always',
    enabled: !isReview,
  });

  //학습이 필요한 지식만 필터링
  const filteredKnowledges = isReview
  ? knowledges || []
  : validationResult?.incorrectIds.length === 0
    ? knowledges || []
    : knowledges?.filter(knowledge => validationResult?.incorrectIds.includes(knowledge.id)) || [];

  const onScrollUp = () => {
    containerRef.current?.scrollTo(0, 0);
  };

  const handleNext = async () => {
    if(currentKnowledgeIndex < filteredKnowledges!.length - 1) {
      setCurrentKnowledgeIndex(prev => prev + 1);
    } else if(isReview) { //복습 페이지인 경우 다 풀었을 때 api 요청 보내지 않음
      setShowCompletion(true);
    } else {
      try {
        const useMock = process.env.NEXT_PUBLIC_USE_MSW_KNOWLEDGE === 'true';
        let response;

        if(useMock){
          response = await axios.put(`/mock/studies/${studyId}/knowledge/review`, {
            correctIds: correctIds
          });
        } else {
          const endPoint = `/api/studies/${studyId}/knowledge/review`;
          const method = validationResult?.correctIds.length === 0 ? 'post' : 'put';
          const payload = validationResult?.correctIds.length === 0 
            ? {correctIds, incorrectIds}
            : {correctIds}; 
  
          response = await authApi[method](endPoint, payload);
        }

        if(response.status === 200) {
          setShowCompletion(true);
        }
      } catch(error) {
        console.error('Failed to submit review:', error);
        alert("오류가 발생하였습니다.");
        router.replace('/home');
      }
    }
  }

  if(isLoading || !knowledges || (!isReview && !validationResult)) {
    return (
      <div className='flex max-w-lg mx-auto min-h-screen bg-gray-50 items-center justify-center'>
        <LoadingSpinner size={"md"} />
      </div>
    )
  }

  return (
    <div className="relative max-w-lg mx-auto min-h-screen bg-gray-50">
      {/* Progress Header */}
      <Header
        currentKnowledgeIndex={currentKnowledgeIndex}
        knowledgesLength={filteredKnowledges.length}
        onExit={() => setShowExitConfirm(true)}
      />

      {/* Main Content */}
      <div ref={containerRef} className="p-5 h-[calc(100vh-140px)] overflow-y-auto scrollbar-hide">
        <KnowledgeStep
          knowledge={filteredKnowledges[currentKnowledgeIndex]}
          knowledgesLength={filteredKnowledges.length}
          currentStep={currentKnowledgeIndex}
          setCorrectIds={setCorrectIds}
          setIncorrectIds={setInCorrectIds}
          handleNext={handleNext}
          onScrollUp={onScrollUp}
        />
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
            knowledgeRefetch();
            router.replace(isReview ? '/review' : '/home');
          }}
        />
      )}
    </div>
  );
}