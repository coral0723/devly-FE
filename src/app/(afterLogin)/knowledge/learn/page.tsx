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

export default function KnowledgeLearnPage() {
  const [currentKnowledgeIndex, setCurrentKnowledgeIndex] = useState<number>(0);
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [showCompletion, setShowCompletion] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const studyId = searchParams.get('studyId');

  const {data: knowledges, isLoading} = useQuery<Knowledge[], object, Knowledge[], [_1: string, _2: string, string]>({
    queryKey: ['knowledge', 'learn', studyId!],
    queryFn: getKnowledges,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const handleNext = () => {
    if(currentKnowledgeIndex < knowledges!.length - 1) {
      setCurrentKnowledgeIndex(prev => prev + 1);
    } else {
      setShowCompletion(true);
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
              {currentKnowledgeIndex + 1} / {knowledges.length}
            </span>
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${((currentKnowledgeIndex + 1) / knowledges.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div ref={containerRef} className="p-5 h-[calc(100vh-140px)] overflow-y-auto scrollbar-hide">
        <KnowledgeStep
          knowledge={knowledges[currentKnowledgeIndex]}
          knowledgesLength={knowledges.length}
          currentStep={currentKnowledgeIndex}
          handleNext={handleNext}/>
      </div>

      {showExitConfirm && (
        <ExitConfirmModal onClose={() => setShowExitConfirm(false)}/>
      )}

      {showCompletion && (
        <CompletionModal/>
      )}
    </div>
  );
}
