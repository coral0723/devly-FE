"use client"

import UnderDevelopment from "../_component/UnderDevelopment";
import { useState } from "react";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { StudyLog } from "@/model/StudyLog";
import { getStudyLogs } from "./_lib/getStudyLogs";
import BottomNavigation from "../_component/BottomNavigation";
import LogContainer from "./_component/LogContainer";
import { categories } from "./_data/categories";

export default function ReviewPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const isDevelopment = process.env.NODE_ENV === 'development';
  const {
    data,
    fetchNextPage, 
    hasNextPage
  } = useInfiniteQuery<StudyLog[], object, InfiniteData<StudyLog[]>, [_1: string], number>({
    queryKey: ["review"],
    queryFn: getStudyLogs,
    initialPageParam: 0, 
    getNextPageParam: (lastPage, allPages) => { //백엔드 완성되면 수정 필요
      return lastPage.length === 0 ? undefined : allPages.length
    },
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: isDevelopment,
  });

  if(!isDevelopment) {
    return <UnderDevelopment/>
  }

  // // 선택된 카테고리에 따라 데이터 필터링
  const filteredLogs = data?.pages.flatMap(page => page).map(dateGroup => {
    // 각 날짜 그룹에 대해 필터링된 로그 생성
    if (selectedCategory === 'all') {
      return dateGroup; // 전체 카테고리 선택 시 모든 데이터 반환
    } else {
      // 선택된 카테고리에 맞는 로그만 필터링
      const filteredDateLogs = {
        ...dateGroup,
        logs: dateGroup.logs.filter(log => log.study === selectedCategory)
      };
      return filteredDateLogs;
    }
  }).filter(dateGroup => dateGroup.logs.length > 0); // 필터링 후 로그가 없는 날짜는 제외

  return (
    <div className="max-w-lg mx-auto h-[100dvh] bg-gray-100 flex flex-col">
      <div className="bg-white border-b border-gray-200">
        <div className="p-4">
          <h1 className="text-xl font-semibold text-gray-900">복습</h1>
          <p className="text-sm text-gray-500 mt-1">
            매일 배운 내용을 복습하며 실력을 쌓아보세요!
          </p>
        </div>
      </div>

      <div className="px-4 pb-2 my-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.study}
              onClick={() => setSelectedCategory(category.study)}
              className={`px-7 py-2 rounded-full text-sm whitespace-nowrap transition-color
                ${selectedCategory === category.study
                  ? category.style
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-200'
                }`}
            >
              {category.name}  
            </button>
          ))}
        </div>
      </div>

      <LogContainer
        studyLogs={filteredLogs!}
        hasNextPage={hasNextPage}
        onLoadMore={() => {
          fetchNextPage();
          return Promise.resolve();
        }}
      />
      
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white safe-area-bottom"> 
        <div className="max-w-lg mx-auto border-t border-gray-200">
            <BottomNavigation/>
        </div>
      </div>
    </div>
  )
}