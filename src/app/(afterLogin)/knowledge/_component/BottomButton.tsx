"use client"

import { useRouter } from "next/navigation"

export default function BottomButton() {
  const router = useRouter();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-10">
      <button
          onClick={() => router.push('/knowledge/learn')}
          className="w-full py-4 bg-blue-500 text-white rounded-xl text-lg font-medium hover:bg-blue-600 active:scale-[0.98] transition-all"
      >
          학습 시작하기
      </button>
    </div>
  )
}