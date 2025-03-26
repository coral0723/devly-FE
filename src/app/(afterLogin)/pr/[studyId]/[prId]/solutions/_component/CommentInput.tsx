"use client"

import { Comment } from "@/model/pr/solutions/Comment";
import { faker } from "@faker-js/faker";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar } from "antd";
import axios from "axios";
import { FormEventHandler, useState } from "react";

type Props = {
  solutionId: number,
}

export default function CommentInput({ solutionId }: Props) {
  const [text, setText] = useState<string>("");
  const queryClient = useQueryClient();
  const addComment = useMutation({
    mutationFn: () => {
      return axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pr/solution/addComment/${solutionId}`,
        { text: text }, {
        headers: {
          'Cache-Control': 'no-store',
        },
      });
    },
    onMutate() {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map(cache => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if(queryKey[0] === "pr" && queryKey[1] === "solution" && queryKey[2] === solutionId) {
          const value: Comment | InfiniteData<Comment[]> | undefined = queryClient.getQueryData(queryKey);
          console.log("value입니다: ", value);
          if(value && 'pages' in value) {
            const newComment = {
              id: -Date.now(),
              name: "username",
              profile: faker.image.avatar(),
              text: text,
              time: new Date(),
            };
            const shallow = {...value};
            value.pages = {...value.pages};
            value.pages[0] = [...value.pages[0]];
            shallow.pages[0] = [
              newComment,
              ...shallow.pages[0],
            ];
            queryClient.setQueryData(queryKey, shallow);
            setText("");
          }
        };
      });
    },
  });

  const handleAddComment: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    addComment.mutate();
  }
  
  return (
    <form 
      onSubmit={handleAddComment} 
      className="flex space-x-2 px-4 py-3 border-t border-gray-100"
    >
      <Avatar
        className="w-8 h-8"
        src={faker.image.avatar()}
      />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="댓글을 입력하세요..."
        className="flex-1 bg-gray-100 rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
      />
      <button 
        type="submit" 
        className="text-purple-600 font-medium text-sm hover:cursor-pointer"
        disabled={text.trim() === ""}
      >
        게시
      </button>
    </form>
  )
}