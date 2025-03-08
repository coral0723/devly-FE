'use client';

import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import ExitConfirmModal from './_component/ExitConfirmModal';
import CompletionModal from './_component/CompletionModal';
import KnowledgeStep from './_component/KnowledgeStep';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Knowledge } from '@/model/Knowledge';
import { getKnowledges } from '../_lib/getKnowledges';
import LoadingSpinner from '@/app/_component/LoadingSpinner';
import { getReviewKnowledges } from '../_lib/getReviewKnowledge';
import { useRouter } from "next/navigation";
import { getValidationKnowledgeResult } from '../_lib/getValidationKnowledgeResult';
import { ValidationResult } from '@/model/ValidationResult';
import axios from 'axios';
import { authApi } from '@/app/_lib/axios';

type Props = {
  isReview?: boolean;
}

export default function KnowledgeLearnPage({isReview = false}: Props) {
  const [currentKnowledgeIndex, setCurrentKnowledgeIndex] = useState<number>(0);
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [showCompletion, setShowCompletion] = useState<boolean>(false);
  const [correctIds, setCorrectIds] = useState<number[]>([]);
  const [incorrectIds, setInCorrectIds] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const studyId = searchParams.get('studyId');

  const {data: knowledges, isLoading, refetch: knowledgeRefetch} = useQuery<Knowledge[], object, Knowledge[], [_1: string, _2: string, string]>({
    queryKey: ['knowledge', isReview ? 'review' : 'learn', studyId!],
    queryFn: isReview ? getReviewKnowledges : getKnowledges,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
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
        //msw용
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/studies/${studyId}/knowledge/review`, {
          correctIds: correctIds
        });

        // const endPoint = `/api/studies/${studyId}/knowledge/review`;
        // const method = validationResult?.correctIds.length === 0 ? 'post' : 'put';
        // const payload = validationResult?.correctIds.length === 0 
        //   ? {correctIds, incorrectIds}
        //   : {correctIds}; 

        // const res = await authApi[method](endPoint, payload);

        if(res.status === 200) {
          setShowCompletion(true);
        }
      } catch(error) {
        console.error('Failed to submit review:', error);
        alert("오류가 발생하였습니다.");
        router.replace('/home');
      }
    }
  }

  if(isLoading || !knowledges) {
    return (
      <div className='flex max-w-lg mx-auto min-h-screen bg-gray-50 items-center justify-center'>
        <LoadingSpinner size={"md"} />
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
              {/* <ChevronLeft size={24} /> */}
              <X size={24}/>
            </button>
            <span className="text-sm text-gray-500">
              {currentKnowledgeIndex + 1} / {filteredKnowledges.length}
            </span>
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${((currentKnowledgeIndex + 1) / filteredKnowledges.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

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
        <ExitConfirmModal onClose={() => setShowExitConfirm(false)}/>
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
