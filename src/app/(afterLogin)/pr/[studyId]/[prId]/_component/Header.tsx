"use client"

import { X } from "lucide-react";

type Props = {
  title: string;
  currentStep: number;
  stepLength: number;
  setCurrentStep: (currentStep: number) => void; 
  setShowFiles: (value: boolean) => void;
  onExit: () => void;
}

export default function Header({title, currentStep, stepLength, setCurrentStep, setShowFiles, onExit}: Props) {
  return (
    <div className="sticky top-0 z-10 bg-white p-4 border-b border-gray-200 shadow-sm">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between relative w-full">
          <div className="flex items-center gap-2 flex-1">
            <button
              onClick={onExit}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
            >
              <X size={24}/>
            </button>
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
              >
                이전 단계
              </button>
            )}
          </div>
          <div className="flex-1 flex justify-center">
            <span className="px-2 py-1 text-sm bg-purple-100 text-purple-800 rounded-full">
              Step {currentStep}/{stepLength}
            </span>
          </div>
          <div className="flex flex-1 justify-end gap-2">
            <button
              onClick={() => setShowFiles(true)}
              className="py-2 px-3 text-sm border border-gray-300 rounded hover:bg-gray-50"
            >
              변경된 파일
            </button>
          </div>
        </div>
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      </div>
    </div>
  )
}