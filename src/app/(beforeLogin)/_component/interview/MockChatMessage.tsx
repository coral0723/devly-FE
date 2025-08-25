import { Chat } from "@/model/interview/Chat"
import { Bot } from "lucide-react";

type Props = {
  chat: Chat;
}

export default function MockChatMessages({ chat }: Props) {
  return (
    <div 
      key={chat.id} 
      className={`flex mb-4 items-start ${
        chat.role === 'ai' 
          ? 'justify-start' 
          : 'justify-end'
      }`}
    >
      {chat.role === 'ai' && (
        <div className="bg-orange-100 rounded-full shrink-0 p-1 md:p-2 mr-2 border-2 border-orange-400">
          <Bot className="text-orange-400 w-4 h-4 md:w-5 md:h-5"/>
        </div>
      )}
      <div 
        className={`py-3 px-3 max-h-96 overflow-y-auto w-fit max-w-[calc(100%-3rem)] ${
          chat.role === 'ai' 
            ? 'bg-orange-100 border-orange-200 rounded-b-xl rounded-tr-xl' 
            : 'bg-white rounded-b-xl rounded-tl-xl'
        }`}
      >
        <div className="whitespace-pre-wrap break-words text-xs md:text-sm">
          {chat.content}
        </div>
      </div>
    </div>
  )
}