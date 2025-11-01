"use client"

import { PrChangedFiles } from "@/model/pr/PrChangedFiles"
import { colorizeCode } from "../_lib/colorizeCode";
import { memo } from "react";

type Props = {
  prChangedFiles: PrChangedFiles;
}

export default memo(function ChangedFiles({ prChangedFiles }: Props) {
  return (
      <div className="flex-1 overflow-hidden px-4">
        {/* Code Area */}
        <div className="space-y-4 max-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-12rem)] overflow-y-auto pb-8">
          {prChangedFiles.files.map((file, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                <span className="text-sm md:text-base font-medium text-gray-800">{file.fileName}</span>
                <span className="text-xs text-gray-500">{file.language}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                <tbody>
                  {file.content.split('\n').map((line, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="select-none w-12 pl-4 pr-2 text-right text-xs md:text-base text-gray-400 border-r border-gray-100">
                        {i + 1}
                      </td>
                      <td className="px-2 font-mono whitespace-pre text-xs md:text-base">
                        {colorizeCode(line, file.language)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
})