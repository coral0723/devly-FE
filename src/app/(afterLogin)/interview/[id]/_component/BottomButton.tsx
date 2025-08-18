"use client"

import { Mic } from "lucide-react";

type Props = {
  isRecording: boolean;
  isEnd: boolean;
  setShowCompletion: (completion: boolean) => void;
  handleRecord: () => void;
}

export default function BottomButton({isRecording, isEnd, setShowCompletion, handleRecord}: Props) {
  const handleClick = () => {
    if (isEnd) {
      setShowCompletion(true);
    } else {
      handleRecord();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-2 bg-white border border-gray-200 z-10">
      <div className="max-w-xl mx-auto">
        <button 
          className={`w-full py-3 text-white text-lg font-medium rounded-lg flex items-center justify-center ${
            isEnd 
              ? 'bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600'
              : isRecording 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-orange-500 hover:bg-orange-600'
          }`}
          onClick={handleClick}
        >
          {!isEnd && <Mic className="mr-2 h-4 w-4" />}
          {isEnd 
            ? '면접 마치기' 
            : isRecording 
            ? '녹음 중...' 
            : '말하기'
          }
        </button>
      </div>
    </div>
  )
}