"use client";

import { Tasks } from '@/model/Tasks';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, Lightbulb, GitPullRequest, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getTodayTasks } from '../_lib/getTodayTasks';
import MainFeaturesSkeleton from './skeleton/MainFeaturesSkeleton';

export default function MainFeatures() {
  const router = useRouter();

  const {data: tasks, isLoading} = useQuery<Tasks, object, Tasks, [_1: string]>({
    queryKey: ['todayTasks'],
    queryFn: getTodayTasks,
    staleTime: 0,
    refetchOnMount: 'always',
  });

  //로딩 중이거나 데이터가 없다면 Skeleton을 보여줌
  if(isLoading || !tasks) {
    return (
      <MainFeaturesSkeleton/>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* 단어 학습 */}
      <div
          className={`bg-white rounded-2xl border border-gray-200 p-5 space-y-3 transition-all
            ${tasks.word.completed === false && "cursor-pointer hover:bg-emerald-50 hover:border-emerald-200 active:scale-95"}`}
          onClick={tasks.word.completed ? undefined : (() => {router.replace(`/word?studyId=${tasks.word.studyId}&wordTotal=${tasks.word.total}`)})}
      >
        <div className="flex items-center justify-between">
          <BookOpen size={32} className="text-emerald-500"/>
          {tasks.word.completed === false ? (
            <span className={`text-sm px-3 py-1.5 rounded-full animate-pulse ${tasks.word.total === 5 ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"} `}>
              {tasks.word.total === 5 ? "단어 5개" : `오답 ${tasks.word.total}개`}
            </span>
          ) : (
            <span className="text-sm font-semibold px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full">
              완료!
            </span>
          )}
        </div>
        <h3 className="text-lg font-medium">개발 용어</h3>
        <p className="text-base text-gray-500">문서에 자주 등장하는 영어 용어 학습</p>
      </div>

      {/* 개발 지식 */}
      <div
          className={`bg-white rounded-2xl border border-gray-200 p-5 space-y-3 transition-all
            ${tasks.knowledge.completed === false && "cursor-pointer hover:bg-blue-50 hover:border-blue-200 active:scale-95"}`}
          onClick={tasks.knowledge.completed ? undefined : (() => {router.replace(`/knowledge?studyId=${tasks.knowledge.studyId}&knowledgeTotal=${tasks.knowledge.total}`)})}
      >
        <div className="flex items-center justify-between">
          <Lightbulb size={32} className="text-blue-500"/>
          {tasks?.knowledge.completed === false ?(
            <span className="text-sm px-3 py-1.5 bg-blue-100 text-blue-600 rounded-full animate-pulse">
              지식 {tasks.knowledge.total}개
            </span>
          ) : (
            <span className="text-sm font-semibold px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full">
              완료!
            </span>
          )}
        </div>
        <h3 className="text-lg font-medium">개발/CS 지식</h3>
        <p className="text-base text-gray-500">알면 좋은 개발/CS 지식 학습</p>
      </div>

      {/* 모의 PR */}
      <div
          className={`bg-white rounded-2xl border border-gray-200 p-5 space-y-2 transition-all
            ${tasks.pr.completed === false && "cursor-pointer hover:bg-purple-50 hover:border-purple-200 active:scale-95"}`}
          onClick={tasks.pr.completed ? undefined : (() => {router.replace(`/pr/${tasks.pr.studyId}`)})}
      >
        <div className="flex items-center justify-between">
          <GitPullRequest size={24} className="text-purple-500"/>
          {tasks.pr.completed === false ?(
            <span className="text-sm px-3 py-1.5 bg-purple-100 text-purple-600 rounded-full animate-pulse">
              PR {tasks.pr.total}개
            </span>
          ) : (
            <span className="text-sm font-semibold px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full">
              완료!
            </span>
          )}
        </div>
        <h3 className="font-medium">모의 PR</h3>
        <p className="text-base text-gray-500">PR 작성 연습과 질문 답변 연습</p>
      </div>

      {/* 모의 면접 */}
      <div
          className={`bg-white rounded-2xl border border-gray-200 p-5 space-y-2 transition-all
            ${tasks.discussion.completed === false && "cursor-pointer hover:bg-orange-50 hover:border-orange-200 active:scale-95"}`}
          onClick={tasks.discussion.completed ? undefined : (() => {router.replace(`/discussion?studyId=${tasks.discussion.studyId}`)})}
      >
        <div className="flex items-center justify-between">
          <MessageSquare size={24} className="text-orange-500"/>
          {tasks.discussion.completed === false ?(
            <span className="text-sm px-3 py-1.5 bg-orange-100 text-orange-600 rounded-full animate-pulse">
              주제 {tasks.discussion.total}개
            </span>
          ) : (
            <span className="text-sm font-semibold px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full">
              완료!
            </span>
          )}
        </div>
        <h3 className="font-medium">모의 면접</h3>
        <p className="text-base text-gray-500">실제 개발 면접 스피킹</p>
      </div>
    </div>
  )
}