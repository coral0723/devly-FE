"use client"

import { MessageCircle, Search, ThumbsUp } from "lucide-react";
import BottomNavigation from "../_component/BottomNavigation"
import { useState } from "react";
import UnderDevelopment from "../_component/UnderDevelopment";
import { samplePosts } from "./_data/samplePosts";

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const isDevelopment = process.env.NODE_ENV === 'development';

  if(!isDevelopment) { //배포 환경에서는 <UnderDevelopment/>를 보여줌
    return <UnderDevelopment/>;
  }

  return (
    <div className="max-w-lg mx-auto h-[100dvh] bg-gray-100 flex flex-col relative">
      <div className="bg-white border-b border-gray-200">
        <div className="p-4">
          <h1 className="text-xl font-semibold text-gray-900">커뮤니티</h1>
            <p className="text-sm text-gray-500 mt-1">
              커뮤니티에서 지식을 나누고 인사이트를 얻어보세요!
            </p>
        </div>

        <div className="px-4 pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-16 scrollbar-hide">
        <div className="divide-y divide-gray-200">
          {samplePosts.map((post) => (
            <div key={post.id} className="bg-white p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <h2 className="text-base font-semibold text-gray-900 hover:cursor-pointer">{post.title}</h2>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2 hover:cursor-pointer">{post.content}</p>
                </div>
                <div className="flex-shrink-0">
                  <img 
                    className="w-16 h-16 rounded-md object-cover"
                    src={post.thumbnail}
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center text-xs text-gray-500">
                  <span>{post.author}</span>
                  <span className="mx-1">•</span>
                  <span>
                  {new Date(post.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                    }).replace(/\. /g, '-').replace('.', '')
                  }
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-4 bottom-24 z-40">
        <button 
          className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
          aria-label="글쓰기"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white safe-area-bottom"> 
        <div className="max-w-lg mx-auto border-t border-gray-200">
            <BottomNavigation/>
        </div>
      </div>
    </div>
  )
}