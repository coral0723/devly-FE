"use client"

// import UnderDevelopment from "../_component/UnderDevelopment";
import { useState, useEffect } from "react";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { StudyLog } from "@/model/StudyLog";
import { getStudyLogs } from "./_lib/getStudyLogs";
import BottomNavigation from "../_component/BottomNavigation";
import LogContainer from "./_component/LogContainer";
import { categories } from "./_data/categories";
import Header from "./_component/Header";

export default function ReviewPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isClient, setIsClient] = useState(false);
  
  // useEffect를 사용해 클라이언트 사이드임을 확인
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // 클라이언트에서만 process.env 값을 확인
  // const isDevelopment = isClient ? process.env.NODE_ENV === 'development' : false;
  
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
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: isClient,
    // enabled: isClient && isDevelopment, // 클라이언트 사이드에서만 활성화
  });

  // 미완성 기능일 때 보여주는 컴포넌트
  // 개발 모드가 아니거나 아직 클라이언트 사이드 렌더링이 아닌 경우
  // if(!isClient || !isDevelopment) {
  //   return <UnderDevelopment/>
  // }

  // 로딩 중이거나 데이터가 없는 경우
  if(isLoading || !data) {
    return (
      <div className="max-w-lg mx-auto h-[100dvh] bg-gray-100 flex flex-col items-center justify-center">
        <p>로딩 중...</p>
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
        
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white safe-area-bottom"> 
          <div className="max-w-lg mx-auto border-t border-gray-200">
              <BottomNavigation/>
          </div>
        </div>
      </div>
    </div>
  )
}