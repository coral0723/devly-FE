"use client";

import { Pr } from "@/model/Pr";
import { JAVA_RULES } from "../_data/JAVA_RULES";
import { JS_RULES } from "../_data/JS_RULES";

type Props = {
  pr: Pr;
  onClose: () => void;
};

export default function ChangedFilesModal({ pr, onClose }: Props) {
  const colorizeCode = (line: string, language: 'java' | 'javascript') => {
    const rules = language === 'java' ? JAVA_RULES : JS_RULES;
    
    // 단어 단위로 분리하되, 특수문자도 보존
    const tokens = line.split(/(\s+|[.,(){}[\];])/);
    
    return tokens.map((token, index) => {
      // 공백은 그대로 반환
      if (!token.trim()) {
        return token;
      }
  
      // 토큰에 맞는 규칙 찾기
      const matchedRule = rules.find(rule => rule.pattern.includes(token));
      
      return (
        <span 
          key={index} 
          className={matchedRule ? matchedRule.className : 'text-gray-800'}
        >
          {token}
        </span>
      );
    });
  };
  
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
                    {file.content.split('\n').map((line, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="select-none w-12 pl-4 pr-2 text-right text-gray-400 border-r border-gray-100">
                          {i + 1}
                        </td>
                        <td className="px-2 font-mono whitespace-pre">
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
      </div>
    </div>
  );
}
