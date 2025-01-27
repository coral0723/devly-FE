"use client"

type Props = {
  key: number;
  chat: {
    role: string;
    content: string;
  }
}

export default function ChatMessage({key, chat}: Props) {
  return (
    <div 
      key={key} 
      className={`mb-4 p-4 rounded-xl ${
        chat.role === 'ai' 
          ? 'bg-orange-100 border-orange-200 mr-12' 
          : 'bg-white ml-12'
      }`}
    >
      <div className="text-sm text-gray-600 mb-1">
        {chat.role === 'ai' ? 'AI 면접관' : '나'}
      </div>
      <div>{chat.content}</div>
    </div>
  )
}