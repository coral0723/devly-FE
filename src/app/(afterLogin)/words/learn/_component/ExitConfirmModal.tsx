"use client"

import { useRouter } from 'next/navigation';

type Props = {
  onClose: () => void;
}

export function ExitConfirmModal({ onClose }: Props) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
        <h2 className="text-lg font-bold mb-2">학습을 중단하시겠습니까?</h2>
        <p className="text-gray-600 mb-6">
          지금 나가면 현재 진행 상황이 저장되지 않습니다.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50"
          >
            계속 학습하기
          </button>
          <button
            onClick={() => router.replace('/home')}
            className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600"
          >
            나가기
          </button>
        </div>
      </div>
    </div>
  );
}