"use client"

import { Knowledge } from "@/model/knowledge/Knowledge";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
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
import ContentsWrapper from "@/app/_component/ContentsWrapper";
import { msUntilNextMidnight } from "../../../_utils/msUntilNextMidnight";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  studyId: string;
  isReview: boolean;
}

export default function KnowledgeLearningContainer({ studyId, isReview }: Props) {
  const [currentKnowledgeIndex, setCurrentKnowledgeIndex] = useState<number>(0);
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [showCompletion, setShowCompletion] = useState<boolean>(false);
  const [correctIds, setCorrectIds] = useState<number[]>([]);
  const [incorrectIds, setIncorrectIds] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: knowledges, isLoading } = useQuery<Knowledge[], object, Knowledge[], [_1: string, _2: string, string]>({
    queryKey: ['knowledge', 'learn', studyId!],
    queryFn: getKnowledges,
    staleTime: msUntilNextMidnight(),
  });

  const { data: validationResult } = useQuery<ValidationResult, object, ValidationResult, [_1: string, _2: string, string]>({
    queryKey: ['knowledge', 'validation', studyId!],
    queryFn: getValidationKnowledgeResult,
    staleTime: msUntilNextMidnight(),
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
          const endPoint = `/api/knowledge/review/study/${studyId}`;
          const payload = validationResult?.correctIds.length === 0 
            ? {correctIds, incorrectIds}
            : {correctIds}; 
  
          response = await authApi.put(endPoint, payload);
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
    <div className="relative min-h-screen bg-gray-50 scrollbar-hide">
      {/* Progress Header */}
      <Header
        currentKnowledgeIndex={currentKnowledgeIndex}
        knowledgesLength={filteredKnowledges.length}
        onExit={() => setShowExitConfirm(true)}
      />

      {/* Main Content */}
      <ContentsWrapper
        ref={containerRef}
        headerMobileHeight={68}
        headerDesktopHeight={68}
        className="h-[calc(100vh-20px)] overflow-y-auto scrollbar-hide max-w-3xl mx-auto"
      >
        <KnowledgeStep
          knowledge={filteredKnowledges[currentKnowledgeIndex]}
          knowledgesLength={filteredKnowledges.length}
          currentStep={currentKnowledgeIndex}
          setCorrectIds={setCorrectIds}
          setIncorrectIds={setIncorrectIds}
          handleNext={handleNext}
          onScrollUp={onScrollUp}
        />
      </ContentsWrapper>

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
            queryClient.invalidateQueries({
              queryKey: ['knowledge', 'validation', studyId],
            })
            router.replace(isReview ? '/review' : '/home');
          }}
        />
      )}
    </div>
  );
}