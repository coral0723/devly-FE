"use client"

type Props = {
  isReview: boolean;
  onClose: () => void;
}

export function CompletionModal({ isReview, onClose }: Props) {

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2">
          {isReview 
            ? "복습 완료!"
            : "학습 완료! 🎉" 
          }
        </h2>
        <p className="text-gray-600 mb-2">
          {isReview
            ? "모의 면접을 복습했어요"
            : "모의 면접을 완료했어요"
          }
        </p>
        {!isReview ? (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-500 mb-1">획득한 경험치</div>
            <div className="text-2xl font-bold text-orange-600">+200 XP</div>
          </div>
          ) : <></>}
        <button
          onClick={onClose}
          className="w-full py-4 bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white rounded-xl text-lg font-medium"
        >
          완료
        </button>
      </div>
    </div>
  );
}