"use client";

import { motion } from "framer-motion";
import ScrollStack, { ScrollStackItem } from "../_animations/ScrollStack";
import MockContextStep from "./word/MockContextStep";
import MockQuizStep from "./word/MockQuizStep";
import MockWordStep from "./word/MockWordStep";

export default function WordSection() {
  return (
    <motion.section
      className="h-screen w-full flex flex-col items-center justify-center snap-start px-6"
      initial={{ backgroundColor: "#ffffff" }} // 시작 색
      whileInView={{ backgroundColor: "#f2fdf8ff" }} // emerald-100
      transition={{ duration: 3 }} // 전환 시간
      viewport={{ once: true, amount: 1 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 mt-14 rounded-full bg-emerald-100 border-2 border-emerald-600 flex items-center justify-center shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 stroke-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 7v14" />
            <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
          </svg>
        </div>
      </div>

      {/* Description */}
      <h1 className="hidden md:block md:text-4xl md:font-bold md:mb-4">버그 잡듯 영어 용어도 잡아보세요</h1>
      <p className="text-gray-700 text-lg leading-relaxed text-center max-w-xs mb-1 md:text-sm">
        자주 쓰이는 개발 영어 용어를 학습하고,<br />
        퀴즈로 실력을 점검하세요
      </p>

      {/* mock 컴포넌트들 */}
      <div className="flex flex-col items-center justify-center w-full overflow-auto"
        style={{ height: "calc(100vh - 100px)" }}>
        <ScrollStack>
          <ScrollStackItem>
            <MockWordStep />
          </ScrollStackItem>
          <ScrollStackItem>
            <MockContextStep />
          </ScrollStackItem>
          <ScrollStackItem>
            <MockQuizStep />
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </motion.section>
  );
}
