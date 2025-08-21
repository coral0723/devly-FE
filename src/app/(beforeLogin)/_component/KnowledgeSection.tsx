"use client"

import { motion } from "framer-motion"
import ScrollStack, { ScrollStackItem } from "../_animations/ScrollStack"
import MockKnowledgeStep from "./knowledge/MockKnowledgeStep"

export default function KnowledgeSection() {
  return (
    <motion.section
      className="h-screen w-full flex flex-col items-center justify-center snap-start px-6"
      initial={{ backgroundColor: "#f2fdf8ff" }} // 시작 색
      whileInView={{ backgroundColor: "#ebf2fcff" }} // emerald-100
      transition={{ duration: 3 }} // 전환 시간
      viewport={{ once: true, amount: 1 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 mt-14 rounded-full bg-blue-100 border-2 border-blue-600 flex items-center justify-center shrink-0">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-5 h-5 stroke-blue-600"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round">
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
            <path d="M9 18h6"/>
            <path d="M10 22h4"/>
          </svg>
        </div>
      </div>

      {/* Description */}
      <h1 className="hidden md:block md:text-4xl md:font-bold md:mb-4">코드 읽듯 개념도 술술 읽히게</h1>
      <p className="text-gray-700 text-lg leading-relaxed text-center max-w-xs mb-1 md:text-sm">
        CS 개념과 코드 활용법을 학습하고,<br />
        퀴즈로 이해도를 확인하세요
      </p>

      {/* mock 컴포넌트들 */}
      <div className="flex flex-col items-center justify-center w-full overflow-auto"
        style={{ height: "calc(100vh - 100px)" }}>
        <ScrollStack>
          <ScrollStackItem>
            <MockKnowledgeStep/>
          </ScrollStackItem>
          <ScrollStackItem>
            <h1>두 번째</h1>
          </ScrollStackItem>
          <ScrollStackItem>
            <h1>세 번째</h1>
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </motion.section>
  )
}