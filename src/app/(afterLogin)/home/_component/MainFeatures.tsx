"use client";

import {
  BookOpen,
  Lightbulb,
  GitPullRequest,
  MessageSquare,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MainFeatures() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* 단어 학습 */}
      <div
          className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3 cursor-pointer hover:bg-emerald-50 hover:border-emerald-200 transition-all active:scale-95"
          onClick={() => {router.push('/words')}}
      >
        <div className="flex items-center justify-between">
          <BookOpen size={32} className="text-emerald-500"/>
          <span className="text-sm font-semibold px-3 py-1.5 bg-emerald-100 text-emerald-600 rounded-full animate-pulse">
            단어 10개
          </span>
        </div>
        <h3 className="text-lg font-medium">개발 용어</h3>
        <p className="text-base text-gray-500">문서에 자주 등장하는 영어 용어 학습</p>
      </div>

      {/* 개발 지식 */}
      <div
          className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3 cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all active:scale-95"
          onClick={() => {router.push('/knowledge')}}
      >
        <div className="flex items-center justify-between">
          <Lightbulb size={32} className="text-blue-500"/>
          <span className="text-sm font-semibold px-3 py-1.5 bg-blue-100 text-blue-600 rounded-full animate-pulse">
              지식 3개
          </span>
        </div>
        <h3 className="text-lg font-medium">개발/CS 지식</h3>
        <p className="text-base text-gray-500">알면 좋은 개발/CS 지식 학습</p>
      </div>

      {/* 모의 PR */}
      <div
          className="bg-white rounded-2xl border border-gray-200 p-5 space-y-2 cursor-pointer hover:bg-purple-50 hover:border-purple-200 transition-all"
          onClick={() => {router.push('/pr')}}
      >
        <div className="flex items-center justify-between">
          <GitPullRequest size={24} className="text-purple-500"/>
          <span className="text-sm font-semibold px-3 py-1.5 bg-purple-100 text-purple-600 rounded-full animate-pulse">
            시나리오 1개
          </span>
        </div>
        <h3 className="font-medium">모의 PR</h3>
        <p className="text-base text-gray-500">영어 PR 작성 연습과 질문 답변 연습</p>
      </div>

      {/* 모의 논의 */}
      <div
          className="bg-white rounded-2xl border border-gray-200 p-5 space-y-2 cursor-pointer hover:bg-orange-50 hover:border-orange-200 transition-all"
          onClick={() => {router.push('/discussion')}}
      >
        <div className="flex items-center justify-between">
          <MessageSquare size={24} className="text-orange-500"/>
          {/*  <span className="text-sm px-3 py-1.5 bg-orange-100 text-orange-600 rounded-full animate-pulse">*/}
          {/*  주제 1개*/}
          {/*</span>*/}
          <span className="text-sm font-semibold px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full">
            완료!
          </span>
        </div>
        <h3 className="font-medium">모의 면접</h3>
        <p className="text-base text-gray-500">실제 개발 면접 스피킹</p>
      </div>
  </div>
  )
}