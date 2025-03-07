"use client"

import { CheckCircle } from 'lucide-react';

type Props = {
  isReview: boolean;
  onClose: () => void;
}

export default function CompletionModal({isReview, onClose}: Props) {

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-blue-500" />
        </div>
        <h2 className="text-xl font-bold mb-2">
          {isReview
            ? "복습 완료!"
            : "학습 완료! 🎉"}
        </h2>
        <p className="text-gray-600 mb-2">
          {isReview
            ? "CS/개발 지식을 모두 복습했어요"
            : "CS/개발 지식을 모두 학습했어요"}
        </p>
        {!isReview ? (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-500 mb-1">획득한 경험치</div>
            <div className="text-2xl font-bold text-blue-600">+150 XP</div>
          </div>
        ) : <></>}
        <button
          onClick={onClose}
          className="w-full py-4 bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-500 hover:to-blue-700 text-white rounded-xl text-lg font-medium"
        >
          완료
        </button>
      </div>
    </div>
  )
}