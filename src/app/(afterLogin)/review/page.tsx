"use client"

import { useState } from "react";
import BottomNavigation from "../_component/BottomNavigation";
import { BookOpen, GitPullRequest, Lightbulb, MessageSquare } from "lucide-react";

const categories = [
  { id: 'all', name: '전체', style: 'bg-black text-white' },
  { id: 'words', name: '단어', style: 'bg-emerald-100 border border-emerald-600 text-emerald-600' },
  { id: 'knowledge', name: '지식', style: 'bg-blue-100 border border-blue-600 text-blue-600' },
  { id: 'pr', name: 'PR', style: 'bg-purple-100 border border-purple-600 text-purple-600' },
  { id: 'interview', name: '면접', style: 'bg-orange-100 border border-orange-600 text-orange-600' },
];

const dummyStudies = [
  {
    date: new Date("2025-01-20"),
    activities: [
      {
        study: 'words',
        title: "리액트 훅 사용법 정리",
        exp: 130
      },
      {
        study: 'knowledge',
        title: "Next.js 13 새로운 기능 학습",
        exp: 200
      },
      {
        study: 'pr',
        title: "로그인 페이지 UI 구현",
        exp: 150
      },
      {
        study: 'discussion',
        title: "프로젝트 아키텍처 설계 논의",
        exp: 200
      }
    ]
  },
  {
    date: new Date("2025-01-27"),
    activities: [
      {
        study: 'words',
        title: "리액트 훅 사용법 정리",
        exp: 130
      },
      {
        study: 'pr',
        title: "로그인 페이지 UI 구현",
        exp: 150
      },
    ]
  },
  {
    date: new Date("2025-02-20"),
    activities: [
      {
        study: 'knowledge',
        title: "Next.js 13 새로운 기능 학습",
        exp: 200
      },
      {
        study: 'pr',
        title: "로그인 페이지 UI 구현",
        exp: 150
      },
    ]
  },
]

export default function ReviewPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  return (
    <div className="max-w-lg mx-auto h-[100dvh] bg-gray-100 flex flex-col">
      <div className="bg-white border-b border-gray-200">
        {/* Header */}
        <div className="p-4">
          <h1 className="text-xl font-semibold text-gray-900">복습</h1>
            <p className="text-sm text-gray-500 mt-1">
              매일 배운 내용을 복습하며 실력을 쌓아보세요!
            </p>
        </div>
      </div>

      {/* Category Bar */}
      <div className="px-4 pb-2 my-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-7 py-2 rounded-full text-sm whitespace-nowrap transition-color
                ${selectedCategory === category.id
                  ? category.style
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-200'
                }`}
            >
              {category.name}  
            </button>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-col px-4 overflow-y-auto scrollbar-hide" style={{ height: 'calc(100vh - 215px)' }}>
        {dummyStudies.map((study) => (
          <div key={study.date.toLocaleDateString()} className="flex flex-col bg-white rounded-xl w-full px-4 py-2 mb-4">
            <div className="text-xl font-bold px-2 pt-2">{study.date.toLocaleDateString()}</div>
            <div className="space-y-3 mt-5">
              {study.activities.map((activity) => (
                <div key={activity.study} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
                  <div
                    className={`w-10 h-10 rounded-full bg-${
                      activity.study === 'words' ? 'emerald' :
                      activity.study === 'knowledge' ? 'blue' :
                      activity.study === 'pr' ? 'purple' :
                      'orange'
                    }-100 flex items-center justify-center`}
                  >
                    {activity.study === 'words' && <BookOpen size={20} className={`text-emerald-600`} />}
                    {activity.study === 'knowledge' && <Lightbulb size={20} className={`text-blue-600`} />}
                    {activity.study === 'pr' && <GitPullRequest size={20} className={`text-purple-600`} />}
                    {activity.study === 'discussion' && <MessageSquare size={20} className={`text-orange-600`} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-medium truncate">{activity.title}</p>
                  </div>
                  <span className={`flex items-end text-sm text-gray-600`}>
                    +{activity.exp} XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white safe-area-bottom"> {/* iOS safe area 고려 */}
        <div className="max-w-lg mx-auto border-t border-gray-200">
            <BottomNavigation/>
        </div>
      </div>
    </div>
  )
}