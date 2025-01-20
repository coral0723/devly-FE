"use client";

import { Pr } from "@/model/Pr";

type Props = {
  pr: Pr;
  onClose: () => void;
};

export default function ChangedFilesModal({ pr, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50">
      <div className="h-[calc(100vh-4rem)] mt-8 flex flex-col bg-gray-50 max-w-3xl mx-auto rounded-lg overflow-hidden">
        <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-semibold text-lg text-gray-800">변경된 파일</h3>
          <button
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
        <div className="flex-1 overflow-hidden p-4">
          {/* Code Area */}
          <div className="space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
            {pr.changedFiles.map((file, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                  <span className="font-medium text-gray-800">{file.name}</span>
                  <span className="text-xs text-gray-500">Java</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody>
                      {file.changes.map((line, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="select-none w-12 pl-4 pr-2 text-right text-gray-400 border-r border-gray-100">
                            {i + 1}
                          </td>
                          <td className="w-12 px-2 text-green-600">+</td>
                          <td className="px-2 font-mono whitespace-pre">
                            <span
                              className={
                                line.content.includes("import ") ||
                                line.content.includes("package ")
                                  ? "text-[#7A3E9D]"
                                  : line.content.includes("class ") ||
                                    line.content.includes("public ") ||
                                    line.content.includes("private ") ||
                                    line.content.includes("protected ")
                                  ? "text-[#00627A]"
                                  : line.content.includes("@")
                                  ? "text-[#87939A]"
                                  : line.content.includes("return ") ||
                                    line.content.includes("new ")
                                  ? "text-[#0033B3]"
                                  : "text-[#080808]"
                              }
                            >
                              {line.content}
                            </span>
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
      </div>
    </div>
  );
}
