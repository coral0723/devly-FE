"use client"

import { useState } from "react";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { StudyLog } from "@/model/StudyLog";
import { getStudyLogs } from "./_lib/getStudyLogs";
import BottomNavigation from "../_component/BottomNavigation";
import LogContainer from "./_component/LogContainer";
import { categories } from "./_data/categories";
import Header from "./_component/Header";
import LoadingSpinner from "@/app/_component/LoadingSpinner";

export default function ReviewPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const {
    data,
    fetchNextPage, 
    hasNextPage,
    isLoading
  } = useInfiniteQuery<StudyLog[], object, InfiniteData<StudyLog[]>, [_1: string], number>({
    queryKey: ["review"],
    queryFn: getStudyLogs,
    initialPageParam: 0, 
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length
    },
    staleTime: 0,
  });

  // 로딩 중이거나 데이터가 없는 경우
  if(isLoading || !data) {
    return (
      <div className="max-w-lg mx-auto h-[100dvh] bg-gray-100 flex flex-col items-center justify-center">
        <LoadingSpinner size={"md"}/>
      </div>
    );
  }

  // 선택된 카테고리에 따라 데이터 필터링
  const filteredLogs = data.pages.flatMap(page => page).map(dateGroup => {
    if (selectedCategory === 'all') {
      return dateGroup;
    } else {
      const filteredDateLogs = {
        ...dateGroup,
        logs: dateGroup.logs.filter(log => log.study === selectedCategory)
      };
      return filteredDateLogs;
    }
  }).filter(dateGroup => dateGroup.logs.length > 0);

  return (
    <div className="bg-gray-100">
      <div className="max-w-xl mx-auto h-[100dvh] bg-gray-100 flex flex-col">
        <Header/>

        <div className="px-4 pb-2 pt-2 my-2 mt-[85px]">
          <div className="flex justify-evenly gap-2 overflow-x-auto scrollbar-hide">
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
          studyLogs={filteredLogs}
          hasNextPage={hasNextPage}
          onLoadMore={() => {
            fetchNextPage();
            return Promise.resolve();
          }}
        />
        
        <BottomNavigation/>
      </div>
    </div>
  )
}
