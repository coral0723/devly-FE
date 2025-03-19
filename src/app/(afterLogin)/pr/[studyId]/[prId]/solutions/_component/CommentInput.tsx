"use client"

import { faker } from "@faker-js/faker";
import { Avatar } from "antd";

type Props = {
  newComment: string;
  setNewComment: (newComment: string) => void;
  handleSubmitComment: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function CommentInput({ newComment, setNewComment, handleSubmitComment }: Props) {
  return (
    <form 
      onSubmit={handleSubmitComment} 
      className="flex space-x-2 px-4 py-3 border-t border-gray-100"
    >
      <Avatar
        className="w-8 h-8"
        src={faker.image.avatar()}
      />
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="댓글을 입력하세요..."
        className="flex-1 bg-gray-100 rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
      />
      <button 
        type="submit" 
        className="text-purple-600 font-medium text-sm hover:cursor-pointer"
        disabled={newComment.trim() === ""}
      >
        게시
      </button>
    </form>
  )
}