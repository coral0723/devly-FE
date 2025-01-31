"use client"

import LoadingSpinner from "@/app/_component/LoadingSpinner";
import { Bot } from "lucide-react"

type Props = {
  key: number;
  chat: {
    role: string;
    content: string;
  };
  isLoading: boolean;
}

export default function ChatMessage({key, chat, isLoading}: Props) {
  return (
    <div 
      key={key} 
      className={`mb-4 p-4 rounded-xl ${
        chat.role === 'ai' 
          ? 'bg-orange-100 border-orange-200 mr-12' 
          : 'bg-white ml-12'
      }`}
    >
      <div className="text-sm mb-1">
        {chat.role === 'ai' && (<Bot size={24} className="text-orange-400"/>)}
      </div>
      <div>
        {isLoading ? (
          <LoadingSpinner size={"xs"}/>
        ) : 
        chat.content}
      </div>
    </div>
  )
}