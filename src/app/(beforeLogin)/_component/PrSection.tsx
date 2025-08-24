"use client";

import { RefObject, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  animate,
  useScroll,
} from "framer-motion";
import ScrollMockTrack from "./ScrollMockTrack";
import { GitPullRequest } from "lucide-react";
import MockTopic from "./pr/MockTopic";
import MockPr from "./pr/MockPr";

type Props = { scrollContainerRef?: RefObject<HTMLDivElement | null> };

export default function PrSection({ scrollContainerRef }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null); // ← sticky 영역을 관찰
  const slides = [<MockTopic key="a" />, <MockPr key="b" onModal={false}/>, <MockPr key="c" onModal={true}/>];

  const releaseVH = 40;
  const releaseUnits = releaseVH / 100;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: scrollContainerRef,
    offset: ["start start", "end start"],
  });

  // 0 → 1 (애니메이션으로 제어)
  const t = useMotionValue(0);
  // white/90 → emerald-100/90
  const leftColor = useTransform(
    t,
    [0, 1],
    ["rgba(255,255,255,0.9)", "#f4eefaff"] 
  );

  // gradient 문자열에 MotionValue를 “실시간”으로 바인딩
  const leftBg = useMotionTemplate`
    linear-gradient(
      to right,
      ${leftColor} 0%,
      ${leftColor} 70%,
      rgba(0,0,0,0) 100%
    )
  `;

  // sticky가 뷰포트를 정확히 채운 순간(즉시 100% 가시) 감지
  const isStickyFull = useInView(stickyRef, { amount: 1 });

  useEffect(() => {
    // 들어올 때 1초 동안 천천히 → emerald-100
    // 벗어날 땐 살짝 줄이며 원복
    if (isStickyFull) {
      animate(t, 1, { duration: 1 });
    } else {
      animate(t, 0, { duration: 0.2 });
    }
  }, [isStickyFull, t]);

  const sectionHeight = `calc(${slides.length} * 100vh + ${releaseVH}vh)`;

  return (
    <section ref={sectionRef} className="relative w-full" style={{ height: sectionHeight }}>
      <div
        ref={stickyRef}
        className="sticky top-0 h-dvh md:h-screen bg-white flex items-center justify-center overflow-hidden"
      >
        <div className="relative w-full h-full grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch px-6 lg:px-16">
          {/* 좌측 스크림 */}
          <motion.div
            style={{ background: leftBg }}
            className="pointer-events-none absolute left-0 top-0 h-full w-2/3 hidden md:block z-10"
          />

          {/* 왼쪽: 아이콘 + 제목 + 문구 */}
          <div className="w-full h-full md:z-20 flex justify-start items-start">
            <div className="max-w-2xl md:pl-8 lg:pl-16 pt-10 md:pt-16 lg:pt-24 mx-auto md:mx-0 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full bg-purple-100 border-4 border-purple-500 flex items-center justify-center mb-5 sm:mb-6">
                <GitPullRequest className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 text-purple-500" />
              </div>

              <h2 className="font-extrabold tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block">실제 협업처럼</span>
                <span className="block mt-2 sm:mt-3 md:mt-4 lg:mt-5">PR을 연습하세요</span>
              </h2>

              <p className="mt-4 text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl">
                코드 변경 전후 비교, AI 피드백, 댓글 답변 연습
              </p>
            </div>
          </div>

          {/* 오른쪽: mock 트랙 */}
          <div className="h-[70vh] md:h-[100vh]">
            <ScrollMockTrack
              progress={scrollYProgress}
              slides={slides}
              phoneWidth={330}
              phoneHeight={600}
              gap={128}
              edgeStart={256}
              edgeEnd={1024}
              releaseUnits={releaseUnits}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
