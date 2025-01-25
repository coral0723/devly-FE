"use client"

type Props = {
  index: number;
  message: {
    role: string;
    content: string;
  }
}

export default function ChatMessage({index, message}: Props) {
  return (
    <div 
      key={index} 
      className={`mb-4 p-4 rounded-xl ${
        message.role === 'ai' 
          ? 'bg-orange-100 border-orange-200 mr-12' 
          : 'bg-white ml-12'
      }`}
    >
      <div className="text-sm text-gray-600 mb-1">
        {message.role === 'ai' ? 'AI 면접관' : '나'}
      </div>
      <div>{message.content}</div>
    </div>
  )
}