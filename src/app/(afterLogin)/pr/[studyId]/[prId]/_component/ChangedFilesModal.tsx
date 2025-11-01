"use client";

import { PrChangedFiles } from "@/model/pr/PrChangedFiles";
import ChangedFiles from "./ChangedFiles";
import { memo } from "react";

type Props = {
  prChangedFiles: PrChangedFiles;
  onClose: () => void;
};

export default memo(function ChangedFilesModal({ prChangedFiles, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50">
      <div className="h-screen md:h-[calc(100vh-8rem)] mt-0 md:mt-8 flex flex-col bg-gray-50 max-w-3xl mx-auto md:rounded-lg overflow-hidden">
        <div className="p-4 mb-4 bg-white border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-semibold text-lg text-gray-800">변경된 파일</h3>
          <button
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
        <ChangedFiles
          prChangedFiles={prChangedFiles}
        />
      </div>
    </div>
  );
})
