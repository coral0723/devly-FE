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
import { GitPullRequest } from "lucide-react";
import { useMediaQuery } from "../_hook/UseMediaQuery";
import MockTopic from "./pr/MockTopic";
import MockPr from "./pr/MockPr";
import dynamic from "next/dynamic";
const ScrollMockTrack = dynamic(() => import("./ScrollMockTrack"), { ssr: false }); //마운트 후 화면 크기 측정으로 첫 렌더 고정

type Props = { scrollContainerRef?: RefObject<HTMLDivElement | null> };

export default function PrSection({ scrollContainerRef }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const slides = [<MockTopic key="a" />, <MockPr key="b" onModal={false}/>, <MockPr key="c" onModal={true}/>];

  // Tailwind md 기준: <768px
  const isMobile = useMediaQuery("(max-width: 767px)");

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
    ["rgba(255,255,255,0.9)", "#EDE9FE"]
  );

  // gradient 문자열에 MotionValue를 실시간 바인딩
  const leftBg = useMotionTemplate`
    linear-gradient(
      to right,
      ${leftColor} 0%,
      ${leftColor} 70%,
      rgba(0,0,0,0) 100%
    )
  `;

  const topBg = useMotionTemplate`
  linear-gradient(
    to bottom,
    ${leftColor} 0%,
    ${leftColor} 70%,
    rgba(0,0,0,0) 100%
  )
`;

  // sticky가 뷰포트를 정확히 채운 순간 감지
  const isStickyFull = useInView(stickyRef, { amount: 1 });

  useEffect(() => {
    if (isStickyFull) {
      animate(t, 1, { duration: 1 });
    } else {
      animate(t, 0, { duration: 0.2 });
    }
  }, [isStickyFull, t]);

  const sectionHeight = `calc(${slides.length} * 100vh + ${releaseVH}vh)`;

  // 모바일 분기: phoneWidth/Height/edgeStart 조절
  const RATIO = 600 / 330; // 기존 비율
  const vw = typeof window !== 'undefined' ? window.innerWidth : 390;
  const phoneW = Math.round(Math.min(330, Math.max(220, vw * 0.62)));
  const phoneH = Math.round(phoneW * RATIO);
  const edgeStart = isMobile ? 16 : 256;

  return (
    <section ref={sectionRef} className="relative w-full" style={{ height: sectionHeight }}>
      <div
        ref={stickyRef}
        className="sticky top-0 h-dvh md:h-screen bg-white flex items-center justify-center overflow-hidden"
      >
        <div className="relative w-full h-full px-6 grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-8 md:items-stretch lg:px-16">
          {/* ✅ 모바일 전용: 상단 스크림 */}
          <motion.div
            style={{ background: topBg }}
            className="pointer-events-none absolute left-0 top-0 w-full h-[20vh] md:hidden z-10"
          />

          {/* 데스크탑/태블릿: 좌측 스크림 */}
          <motion.div
            style={{ background: leftBg }}
            className="pointer-events-none absolute left-0 top-0 h-full w-2/3 hidden md:block z-10"
          />

          {/* 왼쪽: 아이콘 + 제목 + 문구 */}
          <div className="w-full flex justify-start items-start z-20 md:h-full">
            <div className="max-w-2xl mx-auto flex flex-col items-center text-center pt-8 md:pl-8 lg:pl-16 md:pt-16 lg:pt-24 md:mx-0 md:items-start md:text-left">
              <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-center md:justify-start md:flex-col gap-3">
                  <div className="w-8 h-8 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full bg-purple-100 border-2 md:border-4 border-purple-500 flex items-center justify-center md:mb-5">
                    <GitPullRequest className="w-4 h-4 md:w-16 md:h-16 lg:w-20 lg:h-20 text-purple-500" />
                  </div>

                  {/* 반응형 제목 */}
                  <h2 className="font-extrabold tracking-tight text-lg sm:text-5xl md:text-6xl lg:text-7xl text-left">
                    {/* 모바일: 한 줄 */}
                    <span className="block md:hidden">
                      실제 협업처럼 PR을 연습하세요
                    </span>

                    {/* 태블릿, 데스크탑: 세 줄 */}
                    <span className="hidden md:block">
                      <span className="block md:mb-4">실제 협업처럼</span>
                      <span className="block">PR을 연습하세요</span>
                    </span>

                  </h2>
                </div>

                {/* 두 번째 줄: 설명 */}
                <p className="mt-1 text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl text-center md:text-left md:mt-5">
                  코드 변경 전후 비교, AI 피드백, 댓글 답변 연습
                </p>
              </div>
            </div>
          </div>

          {/* 오른쪽: mock 트랙 */}
          <div className="h-[min(560px,65dvh)] md:h-screen max-h-[560px] md:max-h-full pb-[env(safe-area-inset-bottom)]">
            <ScrollMockTrack
              progress={scrollYProgress}
              slides={slides}
              phoneWidth={phoneW}     // ✅ 모바일 280, 데스크탑 330
              phoneHeight={phoneH}   // ✅ 모바일 500, 데스크탑 600
              gap={128}
              edgeStart={edgeStart}
              edgeEnd={336}
              releaseUnits={releaseUnits}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
