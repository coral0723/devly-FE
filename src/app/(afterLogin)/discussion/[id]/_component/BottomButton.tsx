"use client"

import { Mic } from "lucide-react";

type Props = {
  isRecording: boolean;
  handleRecord: () => void;
}

export default function BottomButton({isRecording, handleRecord}: Props) {
  return (
    <div className="fixed w-full max-w-lg bottom-0 left-1/2 transform -translate-x-1/2 p-2 bg-white border border-gray-200 z-10">
      <button 
        className={`w-full py-3 text-white text-lg font-medium rounded-lg flex items-center justify-center ${
          isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-orange-500 hover:bg-orange-600'
        }`}
        onClick={handleRecord}
      >
        <Mic className="mr-2 h-4 w-4" />
        {isRecording ? '녹음 중...' : '말하기'}
      </button>
    </div>
  )
}