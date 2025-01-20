"use client";

import { Pr } from "@/model/Pr";

type Props = {
  pr: Pr;
  onClose: () => void;
}

export default function CommitModal({onClose, pr}: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50">
      <div className="h-[calc(100vh-4rem)] mt-8 flex flex-col bg-gray-50 max-w-3xl mx-auto rounded-lg overflow-hidden">
        <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-semibold text-lg text-gray-800">커밋 내역</h3>
          <button
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
        <div className="flex-1 overflow-hidden p-4">
          <div className="space-y-3">
            {pr.commits.map((commit, idx) => (
              <div key={idx} className="p-3 bg-white border border-gray-200 rounded-lg">
                <div className="font-mono text-sm text-[#6A737D] mb-1">
                  {commit.hash}
                </div>
                <div className="text-[#24292E]">{commit.message}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
  </div>
  )
}