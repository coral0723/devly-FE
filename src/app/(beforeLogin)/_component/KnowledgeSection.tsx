"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import ScrollStack, { ScrollStackItem } from "../_animations/ScrollStack"
import type { ScrollStackHandle } from "../_animations/ScrollStack";
import MockKnowledgeStep from "./knowledge/MockKnowledgeStep"
import MockExampleStep from "./knowledge/MockExampleStep"
import MockQuizStep from "./knowledge/MockQuizStep"
import { RefObject, useEffect, useRef } from "react"

type Props = {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
};

export default function KnowledgeSection({ scrollContainerRef }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<ScrollStackHandle | null>(null);

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
    ["#f2fdf8ff", "#ebf2fcff"]
  );

  // 섹션이 컨테이너 뷰포트를 "정확히" 꽉 채운 상태인지
  const isSectionFullyInView = () => {
    const container = scrollContainerRef.current;
    const section = sectionRef.current;
    if (!container || !section) return false;
    const cRect = container.getBoundingClientRect();
    const sRect = section.getBoundingClientRect();
    const topAligned = Math.abs((sRect.top - cRect.top)) < 1; // 1px 허용
    const sameHeight = Math.abs(sRect.height - cRect.height) < 1;
    return topAligned && sameHeight;
  };

  // deltaMode 정규화(라인 단위/페이지 단위 → 픽셀)
  const normalizeDeltaY = (e: WheelEvent) => {
    // 0: pixel, 1: line, 2: page
    if (e.deltaMode === 1) return e.deltaY * 16;
    if (e.deltaMode === 2) return e.deltaY * 100;
    return e.deltaY;
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let rafId: number | null = null;
    let pendingDelta = 0;

    const flush = () => {
      rafId = null;

      const stack = stackRef.current;
      const c = scrollContainerRef.current;
      if (!stack || !c) {
        pendingDelta = 0;
        return;
      }

      let delta = pendingDelta;
      pendingDelta = 0;

      // 내부 스크롤러가 실제로 소비한 양만큼 측정
      const scroller = stack.getScroller();
      const before = scroller ? scroller.scrollTop : 0;

      // 내부에 먼저 적용
      stack.scrollBy(delta);

      const after = scroller ? scroller.scrollTop : 0;
      const consumed = after - before; // 아래로 양수, 위로 음수

      // 남은 델타(= 내부가 더 못 먹은 부분)는 부모 컨테이너로 보냄
      const leftover = delta - consumed;
      if (leftover !== 0) {
        c.scrollTop += leftover;
      }
    };

    const onWheel = (e: WheelEvent) => {
      const stack = stackRef.current;
      if (!stack) return;

      if (!isSectionFullyInView()) return; // 섹션이 꽉 차기 전/후엔 부모 스크롤에 맡김

      // 내부가 시작/끝이면 부모로 바로 통과(막지 않음)
      const atStart = stack.isAtStart();
      const atEnd = stack.isAtEnd();
      const deltaY = normalizeDeltaY(e);
      const goingDown = deltaY > 0;
      const goingUp = deltaY < 0;

      if ((goingDown && atEnd) || (goingUp && !atEnd && atStart && goingUp)) {
        // 끝에서 아래 or 시작에서 위 → 부모로 넘김
        return;
      }

      // 그 외엔 내부에 델타를 우선 먹임 + 남은 델타는 부모로 라우팅
      e.preventDefault(); // 반드시 passive:false로 등록되어야 함 (아래 addEventListener에서 설정)
      pendingDelta += deltaY;

      if (rafId == null) {
        rafId = requestAnimationFrame(flush);
      }
    };

    // wheel을 부모 컨테이너에 달되, 반드시 passive: false
    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel as any);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [scrollContainerRef]);

  return (
    <motion.section
      className="h-screen w-full flex flex-col items-center justify-center snap-start px-6"
      ref={sectionRef}
      style={{ backgroundColor }}
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
      <div className="flex flex-col items-center justify-center w-full overflow-hidden"
        style={{ height: "calc(100vh - 100px)" }}>
        <ScrollStack ref={stackRef} managedByParent>
          <ScrollStackItem>
            <MockKnowledgeStep/>
          </ScrollStackItem>
          <ScrollStackItem>
            <MockExampleStep/>
          </ScrollStackItem>
          <ScrollStackItem>
            <MockQuizStep/>
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </motion.section>
  )
}