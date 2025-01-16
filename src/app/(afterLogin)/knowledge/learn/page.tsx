'use client';

import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { CONCEPT_DATA } from './concepts';
import ExitConfirmModal from './_component/ExitConfirmModal';
import CompletionModal from './_component/CompletionModal';
import KnowledgeStep from './_component/KnowledgeStep';

export default function KnowledgeLearnPage() {
    const [currentKnowledgeIndex, setCurrentKnowledgeIndex] = useState<number>(0);
    const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
    const [showCompletion, setShowCompletion] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const currentKnowledge = CONCEPT_DATA[currentKnowledgeIndex];

    const handleNext = () => {
      if(currentKnowledgeIndex < CONCEPT_DATA.length - 1) {
        setCurrentKnowledgeIndex(prev => prev + 1);
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
                {/* <ChevronLeft size={24} /> */}
                <X size={24}/>
              </button>
              <span className="text-sm text-gray-500">
                {currentKnowledgeIndex + 1} / {CONCEPT_DATA.length}
              </span>
            </div>
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${((currentKnowledgeIndex + 1) / CONCEPT_DATA.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div ref={containerRef} className="p-5 h-[calc(100vh-64px)] overflow-y-auto scrollbar-hide">
          <KnowledgeStep
            knowledge={currentKnowledge}
            knowledgesLength={CONCEPT_DATA.length}
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
