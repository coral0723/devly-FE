"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ShinyText from "../_animations/ShynyText";
import SplitText from "../_animations/SplitText";
import { useRef } from "react";

interface LastSectionProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}


export default function LastSection({ scrollContainerRef }: LastSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // 스크롤 위치 트래킹 (커스텀 컨테이너 + 해당 섹션)
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: sectionRef,
    offset: ["start 80%", "start 20%"], 
    // start end: 섹션이 뷰포트에 들어오기 시작
    // end start: 섹션이 뷰포트에서 완전히 사라질 때
  });

  // 색상 변환 (progress: 0 → 흰색, 1 → 초록색)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#fcf4e9ff", "#ffffffff"],
    { clamp: false} //scrollYProgress가 1이 넘어가도 마지막 색 유지
  );

  const handleScrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  return (
    <motion.section
      className="h-screen w-full flex flex-col items-center justify-center snap-start px-6"
      ref={sectionRef}
      style={{ backgroundColor }}
    >
      <div className="flex flex-col">
        <SplitText
          text="하루 한 걸음,"
          className="text-xl font-bold mb-0 sm:text-3xl sm:mb-3 lg:mb-6 lg:text-7xl"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
        <SplitText
          text="지금 학습의 첫 걸음을 내딛어보세요."
          className="text-xl font-bold mb-0 sm:text-3xl sm:mb-3 lg:mb-6 lg:text-7xl"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
      </div>
      <button
        onClick={handleScrollToTop}
        className="text-sm py-3 px-4 mt-4 rounded-xl font-medium hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 md:text-lg md:py-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.86)" }}
      >
        <ShinyText text="지금 시작하기" disabled={false} speed={2} />
      </button>
    </motion.section>
  );
}
