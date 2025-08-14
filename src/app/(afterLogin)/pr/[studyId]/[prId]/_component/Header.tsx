"use client"

import { ArrowLeft, FileCode2, X } from "lucide-react";

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
            {currentStep <= 1 ? (
              <button
                onClick={onExit}
                className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24}/>
              </button>
              ) : (
                <div className="relative group inline-block">
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
                  >
                    <ArrowLeft size={24} className="text-purple-800"/>
                  </button>
                  <span className="absolute mb-2 left-1 transform translate-x-1/2 
                    bg-purple-100 text-purple-800 text-sm rounded px-2 py-1 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    이전 단계
                  </span>
                </div>
              )
            }
          </div>
          <div className="flex-1 flex justify-center">
            <span className="px-2 py-1 text-sm bg-purple-100 text-purple-800 rounded-full">
              Step {currentStep}/{stepLength}
            </span>
          </div>
          <div className="flex flex-1 justify-end gap-2 relative group inline-block">
            <button
              onClick={() => setShowFiles(true)}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
            >
              <FileCode2 size={24} className="text-purple-800"/>
            </button>
            <span className="absolute mb-2 transform -translate-x-1/2 
              bg-purple-100 text-purple-800 text-sm rounded px-2 py-1 opacity-0 
              group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              변경된 파일
            </span>
          </div>
        </div>
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      </div>
    </div>
  )
}