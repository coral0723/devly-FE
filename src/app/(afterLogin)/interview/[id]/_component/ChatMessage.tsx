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
      className={`flex mb-4 items-start ${
        chat.role === 'ai' 
          ? 'justify-start' 
          : 'justify-end'
      }`}
    >
      {chat.role === 'ai' && (
        <div className="bg-orange-100 rounded-full p-2 mr-2 border-2 border-orange-400">
          <Bot size={24} className="text-orange-400"/>
        </div>
      )}
      <div 
        className={`py-3 px-3 max-h-96 overflow-y-auto w-fit max-w-[calc(100%-3rem)] ${
          chat.role === 'ai' 
            ? 'bg-orange-100 border-orange-200 rounded-b-xl rounded-tr-xl' 
            : 'bg-white rounded-b-xl rounded-tl-xl'
        }`}
      >
        <div className="whitespace-pre-wrap break-words text-sm">
          {isLoading ? (
            <LoadingSpinner size={"xs"}/>
          ) : 
          chat.content}
        </div>
      </div>
    </div>
  )
}