"use client"

import { useRouter } from "next/navigation"

type Props = {
  studyId: string;
  knowledgeTotal: string;
}

export default function BottomButton({ studyId, knowledgeTotal }: Props) {
  const router = useRouter();
  
  return (
    <div className="fixed w-full max-w-lg left-1/2 transform -translate-x-1/2 bottom-0 left-0 right-0 p-2 bg-white border border-gray-200 z-10">
      <button
        onClick={() => {
          if(studyId && knowledgeTotal) {
            router.replace(`/knowledge/learn?studyId=${studyId}`)
          } else {
            router.replace('/home');
          }
        }}
        className={`w-full py-3 text-white rounded-xl text-lg font-medium active:scale-[0.98] transition-all 
          ${knowledgeTotal !== "3" ? "bg-rose-500 hover:bg-rose-600 " : "bg-blue-500 hover:bg-blue-600"}`}
      >
        학습 시작하기
      </button>
    </div>
  )
}