"use client"

import { X } from "lucide-react";

type Props = {
  timeLeft: number;
  setShowExitConfirm: (value: boolean) => void;
}

export default function Header({ timeLeft, setShowExitConfirm }: Props) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
   };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setShowExitConfirm(true)}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 md:w-6 md:h-6"/>
            </button>
            <span className="ml-2 text-base md:text-xl font-medium">React Virtual DOM</span>
          </div>
          <span className="text-sm text-gray-500">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>
      <div className="h-1 bg-gray-100">
        <div
          className="h-full bg-orange-500 transition-all duration-300"
          style={{ width: `${(timeLeft / 30) * 100}%` }}
        />
      </div>
    </div>
  )
}