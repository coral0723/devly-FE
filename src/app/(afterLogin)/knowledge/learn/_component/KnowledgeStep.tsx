"use client"

import { CheckCircle } from "lucide-react";
import { Knowlege } from "../types";

type Props = {
  knowledge: Knowlege;
  knowledgesLength: number;
  currentStep: number;
  onNext: () => void;
}

export default function KnowledgeStep({knowledge, knowledgesLength, currentStep, onNext}: Props) {
  return (
    <div className="space-y-6">
      {/* Topic Header */}
      <div>
        <div className="flex gap-2 mb-2">
          {knowledge.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-2xl font-bold mb-1">{knowledge.title}</h1>
        <p className="text-gray-600">{knowledge.subtitle}</p>
      </div>

      {/* Content Sections */}
      {knowledge.content.map((section, idx) => (
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
          onClick={onNext}
          className={`w-full py-4 text-white rounded-xl font-medium active:scale-[0.98] transition-all
            ${currentStep < knowledgesLength - 1
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-blue-500 hover:bg-blue-600'
            }`}
        >
          {currentStep === knowledgesLength - 1 ? (
            <div className="flex items-center justify-center gap-2">
              <span>퀴즈 풀기</span>
              <svg 
                className="w-6 h-6 animate-bounce" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          ) : '다음'}
        </button>
    </div>
  )
}