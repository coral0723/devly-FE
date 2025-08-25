import { Mic } from "lucide-react";
import MockChatMessages from "./MockChatMessage";

export default function MockChat() {
  const chats = [
    {
      id: 0,
      role: 'ai',
      content: 'Virtual DOM의 개념에 대해 설명해주시겠어요?',
      end: false
    },
    {
      id: 1,
      role: 'user',
      content: 'Virtual DOM은 실제 DOM을 직접 수정하지 않고, 가상 DOM에 먼저 변경 사항을 적용한 뒤 비교(diff)하여 최소한의 변경만 실제 DOM에 반영하는 기술입니다.',
      end: false
    },
    {
      id: 2,
      role: 'ai',
      content: '좋아요! 그렇다면 Virtual DOM과 실제 DOM을 비교할 때 성능상 어떤 장점이 있는지 설명해주실 수 있나요?',
      end: false
    },
    {
      id: 3,
      role: 'user',
      content: 'Virtual DOM을 사용하면 변경 사항이 가상 DOM에서 먼저 계산되므로, 불필요한 렌더링을 줄여 성능 최적화를 할 수 있습니다.',
      end: false
    }
  ];

  return (
    <div className="flex-grow relative overflow-hidden w-full h-full bg-gray-50">

      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
                disabled={true}
              >
                <svg xmlns="http://www.w3.org/2000/svg" 
                  className="w-4 h-4 md:w-6 md:h-6"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/>
                  <path d="m6 6 12 12"/>
                </svg>
              </button>
              <span className="ml-2 text-base font-medium md:text-lg">React Virtual DOM</span>
            </div>
            <span className="text-sm text-gray-500">
              00:28
            </span>
          </div>
        </div>
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-orange-500 transition-all duration-300"
            style={{ width: `${(28 / 30) * 100}%` }}
          />
        </div>
      </div>

      {/* Chat */}
      <div className="max-w-4xl mx-auto p-4 pb-24 overflow-y-auto scrollbar-hide" style={{ height: 'calc(100vh - 40px)' }}>
        {chats.map((chat) => (
          <MockChatMessages
            key={chat.id}
            chat={chat}
          />
        ))}
      </div>

      {/* Bottom Button */}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-white border border-gray-200 z-10">
        <div className="max-w-xl mx-auto">
          <button 
            className={`w-full py-3 text-white text-md font-medium rounded-lg flex items-center justify-center bg-red-500 hover:bg-red-600`}
            disabled={true}
          >
            <Mic className="mr-2 h-4 w-4" />
            녹음 중...
          </button>
        </div>
      </div>
    </div>
  )
}