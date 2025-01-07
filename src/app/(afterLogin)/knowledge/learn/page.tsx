'use client';

import { useState } from 'react';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import { TOPIC_DATA } from './topics';
import ExitConfirmModal from './_component/ExitConfirmModal';
import CompletionModal from './_component/CompletionModal';

export default function KnowledgeLearnPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [showExitConfirm, setShowExitConfirm] = useState(false);
    const [showCompletion, setShowCompletion] = useState(false);

    const currentTopic = TOPIC_DATA[currentStep];

    const handleExit = () => {
        setShowExitConfirm(true);
    };

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Progress Header */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200">
          <div className="max-w-lg mx-auto px-4 py-2">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={handleExit}
                className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft size={24} />
              </button>
              <span className="text-sm text-gray-500">
                {currentStep + 1} / {TOPIC_DATA.length}
              </span>
            </div>
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / TOPIC_DATA.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-lg mx-auto px-4 py-6">
          <div className="space-y-6">
            {/* Topic Header */}
            <div>
              <div className="flex gap-2 mb-2">
                {currentTopic.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-2xl font-bold mb-1">{currentTopic.title}</h1>
              <p className="text-gray-600">{currentTopic.subtitle}</p>
            </div>

            {/* Content Sections */}
            {currentTopic.content.map((section, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 border border-gray-200">
                {section.type === 'intro' && (
                  <div className="text-center">
                    <p className="text-lg mb-6">{section.text}</p>
                    {/* 이미지나 다이어그램이 있다면 표시 */}
                  </div>
                )}

                {section.type === 'explanation' && (
                  <>
                    <h2 className="font-medium text-lg mb-3">{section.title}</h2>
                    <p className="text-gray-600 mb-4">{section.text}</p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <ul className="space-y-2">
                        {section.examples!.map((example, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {section.type === 'realWorld' && (
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h3 className="font-medium mb-2 text-orange-800">{section.title}</h3>
                    <p className="text-orange-700 mb-3">{section.text}</p>
                    <ul className="space-y-1">
                      {section.examples!.map((example, i) => (
                        <li key={i} className="text-sm text-orange-600">• {example}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            {/* Navigation Button */}
            <button
              onClick={() => {
                if (currentStep < TOPIC_DATA.length - 1) {
                  setCurrentStep(prev => prev + 1);
                } else {
                  setShowCompletion(true);
                }
              }}
              className="w-full py-4 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 active:scale-[0.98] transition-all"
            >
              {currentStep < TOPIC_DATA.length - 1 ? '다음' : '완료하기'}
            </button>
          </div>
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
