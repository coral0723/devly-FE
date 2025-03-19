"use client"

import { X } from "lucide-react"

type Props = {
  currentWordIndex: number;
  wordsLength: number; 
  onExit: () => void;
}

export default function Header({ currentWordIndex, wordsLength, onExit }: Props) {
  return (
    <div className="sticky top-0 z-20 bg-white border-b border-gray-200">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between mb-2">
          <button
              onClick={onExit}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24}/>
          </button>
          <span className="text-sm text-gray-500">
            {currentWordIndex + 1} / {wordsLength}
          </span>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${((currentWordIndex + 1) / wordsLength) * 100}%`}}
          />
        </div>
      </div>
    </div>
  )
}