"use client"

import { motion } from "framer-motion"
import ScrollStack, { ScrollStackItem } from "../_animations/ScrollStack"
import MockTopic from "./pr/MockTopic"
import MockPr from "./pr/MockPr"

export default function PrSection() {
  return (
    <motion.section
      className="h-screen w-full flex flex-col items-center justify-center snap-start px-6"
      initial={{ backgroundColor: "#ebf2fcff" }} // 시작 색
      whileInView={{ backgroundColor: "#f4eefaff" }}
      transition={{ duration: 3 }} // 전환 시간
      viewport={{ once: true, amount: 1 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 mt-14 rounded-full bg-purple-100 border-2 border-purple-500 flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" 
            className="w-5 h-5 stroke-purple-500"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round">
            <circle cx="18" cy="18" r="3"/>
            <circle cx="6" cy="6" r="3"/>
            <path d="M13 6h3a2 2 0 0 1 2 2v7"/>
            <line x1="6" x2="6" y1="9" y2="21"/>
          </svg>
        </div>
      </div>

      {/* Description */}
      <h1 className="hidden md:block md:text-4xl md:font-bold md:mb-4">AI와 함께 실전 같은 PR 연습을 해보세요</h1>
      <p className="text-gray-700 text-lg leading-relaxed text-center max-w-sm mb-1 md:text-sm">
        PR을 작성하고 AI와 코드 리뷰를 주고받으며,<br /> 
        실무 감각을 길러보세요
      </p>

      {/* mock 컴포넌트들 */}
      <div className="flex flex-col items-center justify-center w-full overflow-auto"
        style={{ height: "calc(100vh - 100px)" }}>
        <ScrollStack>
          <ScrollStackItem>
            <MockTopic/>
          </ScrollStackItem>
          <ScrollStackItem>
            <MockPr/>
          </ScrollStackItem>
          <ScrollStackItem>
            <h1>세 번째 섹션</h1>
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </motion.section>
  )
}