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
        {/* 그리드 컨테이너를 상대 위치로 */}
        <div className="relative w-full h-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* ⬇️ 왼쪽 반쪽을 덮는 스크림 오버레이 (md 이상에서만) */}
          <div
            className="
              pointer-events-none
              absolute left-0 top-0 h-full w-2/3
              hidden md:block
              z-10
              bg-gradient-to-r from-white/90 via-white/90 to-transparent
            "
          />
  
          {/* 왼쪽 문구: 오버레이보다 위로 올리기 */}
          <div className="w-full h-full flex items-center md:z-20">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">버그 잡듯 영어 용어도 잡아보세요</h2>
              <p className="text-gray-600 md:text-lg">스펠링·발음·예문·퀴즈까지 한 번에.</p>
            </div>
          </div>
  
          {/* 오른쪽 트랙: 기본 z-index (오버레이 아래) */}
          <div className="h-[70vh] md:h-[100vh]">
            <ScrollMockTrack
              progress={scrollYProgress}
              slides={slides}
              phoneWidth={330}
              phoneHeight={600}
              gap={24}
              edgeStart={32}
              edgeEnd={8}
              releaseUnits={releaseUnits}
            />
          </div>
        </div>
      </div>
    </section>
  );  
}
