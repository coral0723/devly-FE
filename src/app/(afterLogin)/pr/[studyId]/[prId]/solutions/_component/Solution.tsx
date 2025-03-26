"use client"

import { Solution as ISolution } from "@/model/pr/solutions/Solution"
import { Avatar } from "antd";
import { Heart, MessageCircle } from "lucide-react";
import { MouseEventHandler, useState } from "react";
import CommentsContainer from "./CommentsContainer";
import { useRouter, useParams } from "next/navigation";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

type Props = {
  solution: ISolution;
}

export default function Solution({ solution }: Props) {
  const [showComments, setShowComments] = useState<boolean>(false);
  const router = useRouter();
  const {studyId, prId} = useParams();
  const queryClient = useQueryClient();

  const heart = useMutation({
    mutationFn: () => {
      return axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pr/solution/like/${solution.id}`, {
        headers: {
          'Cache-Control': 'no-store',
        },
      });
    },
    onMutate() {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map(cache => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if(queryKey[0] === "pr" && queryKey[1] === "solutions") {
          const value: ISolution | InfiniteData<ISolution[]> | undefined = queryClient.getQueryData(queryKey);
          if(value && 'pages' in value) {
            const obj = value.pages.flat().find((s) => s.id === solution.id);
            if(obj) {
              const pageIndex = value.pages.findIndex((page) => page.includes(obj));
              const index = value.pages[pageIndex].findIndex((s) => s.id === solution.id);
              const shallow = {...value};
              value.pages = {...value.pages};
              value.pages[pageIndex] = [...value.pages[pageIndex]];
              shallow.pages[pageIndex][index] = {
                ...shallow.pages[pageIndex][index],
                isLiked: true,
                likeCount: shallow.pages[pageIndex][index].likeCount + 1,
              }
              queryClient.setQueryData(queryKey, shallow);
            };
          };
        };
      });
    },
    onError () {
      toast.error('좋아요 실패', {
        id: 'like-error',
        duration: 1000,
      });
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map(cache => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if(queryKey[0] === "pr" && queryKey[1] === "solutions") {
          const value: ISolution | InfiniteData<ISolution[]> | undefined = queryClient.getQueryData(queryKey);
          if(value && 'pages' in value) {
            const obj = value.pages.flat().find((s) => s.id === solution.id);
            if(obj) {
              const pageIndex = value.pages.findIndex((page) => page.includes(obj));
              const index = value.pages[pageIndex].findIndex((s) => s.id === solution.id);
              const shallow = {...value};
              value.pages = {...value.pages};
              value.pages[pageIndex] = [...value.pages[pageIndex]];
              shallow.pages[pageIndex][index] = {
                ...shallow.pages[pageIndex][index],
                isLiked: false,
                likeCount: shallow.pages[pageIndex][index].likeCount - 1,
              }
              queryClient.setQueryData(queryKey, shallow);
            };
          };
        };
      });
    }
  });

  const unheart = useMutation({
    mutationFn: () => {
      return axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pr/solution/unlike/${solution.id}`, {
        headers: {
          'Cache-Control': 'no-store',
        },
      });
    },
    onMutate() {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map(cache => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if(queryKey[0] === "pr" && queryKey[1] === "solutions") {
          const value: ISolution | InfiniteData<ISolution[]> | undefined = queryClient.getQueryData(queryKey);
          if(value && 'pages' in value) {
            const obj = value.pages.flat().find((s) => s.id === solution.id);
            if(obj) {
              const pageIndex = value.pages.findIndex((page) => page.includes(obj));
              const index = value.pages[pageIndex].findIndex((s) => s.id === solution.id);
              const shallow = {...value};
              value.pages = {...value.pages};
              value.pages[pageIndex] = [...value.pages[pageIndex]];
              shallow.pages[pageIndex][index] = {
                ...shallow.pages[pageIndex][index],
                isLiked: false,
                likeCount: shallow.pages[pageIndex][index].likeCount - 1,
              }
              queryClient.setQueryData(queryKey, shallow);
            };
          };
        };
      });
    },
    onError() {
      toast.error("좋아요 취소 실패", {
        id: "unlike-error",
        duration: 1000,
      });
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map(cache => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if(queryKey[0] === "pr" && queryKey[1] === "solutions") {
          const value: ISolution | InfiniteData<ISolution[]> | undefined = queryClient.getQueryData(queryKey);
          if(value && 'pages' in value) {
            const obj = value.pages.flat().find((s) => s.id === solution.id);
            if(obj) {
              const pageIndex = value.pages.findIndex((page) => page.includes(obj));
              const index = value.pages[pageIndex].findIndex((s) => s.id === solution.id);
              const shallow = {...value};
              value.pages = {...value.pages};
              value.pages[pageIndex] = [...value.pages[pageIndex]];
              shallow.pages[pageIndex][index] = {
                ...shallow.pages[pageIndex][index],
                isLiked: true,
                likeCount: shallow.pages[pageIndex][index].likeCount + 1,
              }
              queryClient.setQueryData(queryKey, shallow);
            };
          };
        };
      });
    }
  });

  const handleLike: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (solution.isLiked) {
      unheart.mutate();
    } else {
      heart.mutate();
    }
  };

  return (
    <div className="bg-white rounded-xl w-full mb-4 overflow-hidden">
      {/* Profile Section */}
      <div className="px-4 pt-4">
        <div className="flex space-x-2 items-center">
          <Avatar
            className="w-10 h-10"
            src={solution.user.profile}
          />
          <p className="text-lg">{solution.user.nickname}</p>
          <span className="text-purple-600 text-sm">
          Lv. {solution.user.level}
          </span>
        </div>
      </div>
      
      {/* PR Content */}
      <div className="px-4 py-4">
        <p className="text-sm text-gray-500 line-clamp-4">
          {solution.text}
        </p>
      </div>
      
      {/* Like and Comment Buttons */}
      <div className="flex justify-between items-center px-4 pb-3 border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <button 
            className={`flex items-center space-x-1 ${solution.isLiked ? "text-purple-500 hover:text-purple-700" : "text-gray-500 hover:text-gray-700"}`}
            onClick={handleLike}
          >
            <Heart className={`w-5 h-5 ${solution.isLiked ? "fill-purple-500 text-purple-500" : ""}`} />
            <span>{solution.likeCount}</span>
          </button>
          <button 
            className={`flex items-center space-x-1 ${showComments ? "text-purple-500 hover:text-purple-700" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className={`w-5 h-5`} />
            <span>{solution.commentCount}</span>
          </button>
        </div>
        <button 
          className="flex items-center p-2 bg-purple-100 text-sm text-purple-600 rounded-md hover:cursor-pointer"
          onClick={() => router.push(`/pr/${studyId}/${prId}/solutions/${solution.user.id}`)}
        >
          <span>PR 보러 가기</span>
          <span className="ml-1 inline-block animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </button>
      </div>
      
      {showComments && (
        <CommentsContainer
          solutionId={solution.id}
        />
      )}
    </div>
  )
}