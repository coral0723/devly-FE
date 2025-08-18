"use client"

import { useRouter } from "next/navigation"

type Props = {
  studyId: string;
  wordTotal: string;
}

export default function BottomButton({studyId, wordTotal}: Props) {
  const router = useRouter();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 p-2 bg-white border border-gray-200 z-10">
      <div className="max-w-xl mx-auto">
        <button
          onClick={() => {
            if(studyId && wordTotal) {
              router.replace(`/word/learn?studyId=${studyId}`);
            } else {
              router.replace('/home');
            }
          }}
          className={`w-full py-3 text-white rounded-xl text-lg font-medium active:scale-[0.98] transition-all 
          ${wordTotal !== "5" ? "bg-rose-500 hover:bg-rose-600 " : "bg-green-500 hover:bg-green-600"}`}
        >
          {wordTotal && wordTotal !== "5" ? "오답 풀기" : "학습 시작하기"}
        </button>
      </div>
    </div>
  )
}