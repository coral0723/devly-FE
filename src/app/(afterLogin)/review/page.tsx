  "use client"

  import { useState } from "react";
  import BottomNavigation from "../_component/BottomNavigation";
  import { InfiniteData, useSuspenseInfiniteQuery } from "@tanstack/react-query";
  import { StudyLog } from "@/model/StudyLog";
  import { getStudyLogs } from "./_lib/getStudyLogs";
  import LogContainer from "./_component/LogContainer";

  const categories = [
    { id: 'all', name: '전체', style: 'bg-black text-white' },
    { id: 'words', name: '단어', style: 'bg-emerald-100 border border-emerald-600 text-emerald-600' },
    { id: 'knowledge', name: '지식', style: 'bg-blue-100 border border-blue-600 text-blue-600' },
    { id: 'pr', name: 'PR', style: 'bg-purple-100 border border-purple-600 text-purple-600' },
    { id: 'interview', name: '면접', style: 'bg-orange-100 border border-orange-600 text-orange-600' },
  ];

  export default function ReviewPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const {
      data,
      isLoading,
      fetchNextPage, 
      hasNextPage
      } = useSuspenseInfiniteQuery<StudyLog[], object, InfiniteData<StudyLog[]>, [_1: string], number>({
        queryKey: ["review"],
        queryFn: getStudyLogs,
        initialPageParam: 0, 
        getNextPageParam: (lastPage, allPages) => { //백엔드 완성되면 수정 필요
          return lastPage.length === 0 ? undefined : allPages.length
        },
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
      }) ;

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
        <LogContainer
          studyLogs={data.pages.flatMap(page => page)}
          hasNextPage={hasNextPage}
          onLoadMore={() => {
            fetchNextPage();
            return Promise.resolve();
          }}
        />
        
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white safe-area-bottom"> {/* iOS safe area 고려 */}
          <div className="max-w-lg mx-auto border-t border-gray-200">
              <BottomNavigation/>
          </div>
        </div>
      </div>
    )
  }