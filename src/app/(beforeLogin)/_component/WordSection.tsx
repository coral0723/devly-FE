"use client";

import { RefObject, useRef } from "react";
import { useScroll } from "framer-motion";
import ScrollMockTrack from "./ScrollMockTrack";
import MockWordStep from "./word/MockWordStep";
import MockQuizStep from "./word/MockQuizStep";
import MockContextStep from "./word/MockContextStep";

type Props = { scrollContainerRef?: RefObject<HTMLDivElement | null> };

export default function WordSection({ scrollContainerRef }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const slides = [<MockWordStep key="a" />, <MockContextStep key="b" />, <MockQuizStep key="c" />];

  const releaseVH = 40; // ← 마지막 공백을 40vh로 축소 (원하면 30~50 사이로 조절)
  const releaseUnits = releaseVH / 100;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: scrollContainerRef,
    offset: ["start start", "end start"],
  });

  const sectionHeight = `calc(${slides.length} * 100vh + ${releaseVH}vh)`;

  return (
    <section ref={sectionRef} className="relative w-full" style={{ height: sectionHeight }}>
      <div className="sticky top-0 h-screen bg-white flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-[1100px] px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 왼쪽 문구는 그대로 */}
          <div className="max-w-md text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold mb-2">버그 잡듯 영어 용어도 잡아보세요</h2>
            <p className="text-gray-600 md:text-lg">스펠링·발음·예문·퀴즈까지 한 번에.</p>
          </div>

          {/* 오른쪽 트랙 */}
          <div className="h-[70vh] overflow-y-hidden scrollbar-hide md:h-[80vh]">
            <ScrollMockTrack
              progress={scrollYProgress}
              slides={slides}
              phoneWidth={330}
              phoneHeight={700}
              gap={24}
              edgeStart={32}       // ← 첫 카드 앞 여백 늘림
              edgeEnd={8}          // ← 마지막 카드 뒤 여백 아주 작게
              releaseUnits={releaseUnits} // ← WordSection의 releaseVH와 동기화
            />
          </div>
        </div>
      </div>
    </section>
  );
}
