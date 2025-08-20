"use client"

import { BookOpen, X } from "lucide-react";
import { Fragment } from "react";

export default function MockQuizStep() {
  let text = "Encapsulation helps to protect an object's internal state by restricting direct access."
  const distractors = [
    "Abstraction",
    "Polymorphism",
    "Inheritance"
  ];

  return (
    <div className="flex-grow relative w-full h-full bg-gray-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white border-b border-gray-200">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-2">
            <button
                className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
            >
              <X size={16}/>
            </button>
            <span className="text-xs text-gray-500">
              1 / 5
            </span>
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${(1 / 5) * 100}%`}}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-20 px-4 space-y-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-gray-500 text-xs">
              <BookOpen size={14}/>
              <span>출처: Object-Oriented Programming Guide</span>
          </div>
          <div className="text-sm mb-1 font-mono">
            {text.split(/(Encapsulation)/i).map((part, i) => (
              <Fragment key={i}>
                {part.toLowerCase() === "Encapsulation".toLowerCase() ? (
                  <div className="inline-block border-2 border-gray p-1">
                    <span className="font-bold text-blue-600">
                      <span className="opacity-0">{part}</span>
                    </span>
                  </div>
                ) : part}
              </Fragment>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-2 shadow-sm">
          <div className="space-y-2">
            {distractors.map((distractor, idx) => (
              <button
                key={idx}
                className={`w-full flex items-center gap-4 p-4 text-left border rounded-lg transition-all`}
                disabled={true}
              >
                <div className={`w-6 h-6 flex items-center justify-center rounded-full border-2 flex-shrink-0`}>
                  <span className="text-gray-500">{idx + 1}</span>
                </div>
                <span className="text-sm">{distractor}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white p-2 border border-gray-200 z-10">
          <div className="max-w-xl mx-auto">
            <button
              className={`w-full py-3 text-white text-lg font-medium rounded-xl transition-all bg-gray-300 cursor-not-allowed`}
              disabled={true}
            >
              다음 문제
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}