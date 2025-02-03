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
      className={`flex mb-4 ${
        chat.role === 'ai' 
          ? 'justify-start' 
          : 'justify-end'
      }`}
    >
      <div 
        className={`p-4 rounded-xl max-h-96 overflow-y-auto w-fit max-w-[calc(100%-3rem)] ${
          chat.role === 'ai' 
            ? 'bg-orange-100 border-orange-200' 
            : 'bg-white'
        }`}
      >
        <div className="text-sm mb-1">
          {chat.role === 'ai' && (<Bot size={24} className="text-orange-400"/>)}
        </div>
        <div className="whitespace-pre-wrap break-words">
          {isLoading ? (
            <LoadingSpinner size={"xs"}/>
          ) : 
          chat.content}
        </div>
      </div>
    </div>
  )
}