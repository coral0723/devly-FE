"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import ScrollStack, { ScrollStackItem } from "../_animations/ScrollStack"
import MockTopic from "./interview/MockTopic"
import MockChat from "./interview/MockChat"
import { RefObject, useRef } from "react"

type Props = {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
};

export default function InterviewSection({ scrollContainerRef }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // 스크롤 위치 트래킹 (커스텀 컨테이너 + 해당 섹션)
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: sectionRef,
    offset: ["start end", "end start"], 
    // start end: 섹션이 뷰포트에 들어오기 시작
    // end start: 섹션이 뷰포트에서 완전히 사라질 때
  });

  // 색상 변환 (progress: 0 → 흰색, 1 → 초록색)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#f4eefaff", "#fcf4e9ff"]
  );
  
  return (
    <motion.section
      className="h-screen w-full flex flex-col items-center justify-center snap-start px-6"
      ref={sectionRef}
      style={{ backgroundColor }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 mt-14 rounded-full bg-orange-100 border-2 border-orange-500 flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" 
            className="w-5 h-5 stroke-orange-500"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round">
            <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
      </div>

      {/* Description */}
      <h1 className="hidden md:block md:text-4xl md:font-bold md:mb-4">진짜 면접? 아니, AI 면접!</h1>
      <p className="text-gray-700 text-lg leading-relaxed text-center max-w-xs mb-1 md:text-sm">
        마이크로 대답해보세요.<br />
        AI가 꼬리질문으로 면접 느낌을 살려줄게요
      </p>

      {/* mock 컴포넌트들 */}
      <div className="flex flex-col items-center justify-center w-full overflow-auto"
        style={{ height: "calc(100vh - 100px)" }}>
        <ScrollStack>
          <ScrollStackItem>
            <MockTopic/>
          </ScrollStackItem>
          <ScrollStackItem>
            <MockChat/>
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </motion.section>
  )
}