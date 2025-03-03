"use client"

import { MessageCircle, Search, ThumbsUp } from "lucide-react";
import BottomNavigation from "../_component/BottomNavigation"
import { useState } from "react";
import {faker} from "@faker-js/faker";

const samplePosts = [
  {
    id: 1,
    title: "GPT-4 프롬프트 엔지니어링 팁 공유합니다",
    content: "최근 GPT-4로 작업하면서 발견한 유용한 프롬프트 패턴들을 공유합니다...",
    thumbnail: faker.image.avatar(),
    author: "ai_dev_kim",
    likes: 24,
    comments: 8,
    createdAt: "2023-11-15T09:30:00Z"
  },
  {
    id: 2,
    title: "TensorFlow vs PyTorch 어떤 것을 배워야 할까요?",
    content: "AI 학습을 시작하는데 어떤 프레임워크부터 시작해야 할지 고민입니다...",
    thumbnail: faker.image.avatar(),
    author: "newbie_coder",
    likes: 15,
    comments: 32,
    createdAt: "2023-11-14T14:45:00Z"
  },
  {
    id: 3,
    title: "최신 LLM 파인튜닝 기법 정리",
    content: "최근 논문들에서 발표된 LLM 파인튜닝 기법들을 정리해봤습니다...",
    thumbnail: faker.image.avatar(),
    author: "ml_engineer",
    likes: 47,
    comments: 12,
    createdAt: "2023-11-13T18:20:00Z"
  },
  {
    id: 4,
    title: "RLHF 구현 중 발생한 문제 해결 방법",
    content: "강화학습을 통한 인간 피드백 구현 중 발생한 이슈와 해결 방법을 공유합니다...",
    thumbnail: faker.image.avatar(),
    author: "rl_master",
    likes: 31,
    comments: 5,
    createdAt: "2023-11-12T11:15:00Z"
  },
  {
    id: 5,
    title: "AI 프로젝트를 위한 데이터셋 구축 경험담",
    content: "직접 데이터셋을 구축하면서 경험한 팁과 주의사항들을 공유합니다...",
    thumbnail: faker.image.avatar(),
    author: "data_scientist",
    likes: 19,
    comments: 7,
    createdAt: "2023-11-11T16:30:00Z"
  },
  {
    id: 6,
    title: "AI 프로젝트를 위한 데이터셋 구축 경험담",
    content: "직접 데이터셋을 구축하면서 경험한 팁과 주의사항들을 공유합니다...",
    thumbnail: faker.image.avatar(),
    author: "data_scientist",
    likes: 19,
    comments: 7,
    createdAt: "2023-11-11T16:30:00Z"
  },
  {
    id: 7,
    title: "AI 프로젝트를 위한 데이터셋 구축 경험담",
    content: "직접 데이터셋을 구축하면서 경험한 팁과 주의사항들을 공유합니다...",
    thumbnail: faker.image.avatar(),
    author: "data_scientist",
    likes: 19,
    comments: 7,
    createdAt: "2023-11-11T16:30:00Z"
  },
];

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="max-w-lg mx-auto h-[100dvh] bg-gray-100 flex flex-col relative">
      <div className="bg-white border-b border-gray-200">
        {/* Header */}
        <div className="p-4">
          <h1 className="text-xl font-semibold text-gray-900">커뮤니티</h1>
            <p className="text-sm text-gray-500 mt-1">
              커뮤니티에서 지식을 나누고 인사이트를 얻어보세요!
            </p>
        </div>

        {/* Search Input */}
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

      {/* 게시글 목록 */}
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

      {/* Floating Button */}
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

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white safe-area-bottom"> {/* iOS safe area 고려 */}
        <div className="max-w-lg mx-auto border-t border-gray-200">
            <BottomNavigation/>
        </div>
      </div>
    </div>
  )
}