"use client";

import { useEffect, useRef, useState } from "react";
import { motion, MotionValue, useSpring, useTransform } from "framer-motion";

type Slide = React.ReactNode;

interface ScrollMockTrackProps {
  progress: MotionValue<number>;
  slides: Slide[];
  phoneWidth?: number;
  phoneHeight?: number;
  gap?: number;
  /** 첫 카드 앞 여백(px) */
  edgeStart?: number;
  /** 마지막 카드 뒤 여백(px) */
  edgeEnd?: number;
  /** 해제 구간 길이(뷰포트 비율). 1 = 100vh, 0.4 = 40vh */
  releaseUnits?: number;
  className?: string;
}

export default function ScrollMockTrack({
  progress,
  slides,
  phoneWidth = 330,
  phoneHeight = 700,
  gap = 24,
  edgeStart = 24,   // ← 원하는 만큼 키우면 첫 카드 앞 여백 증가
  edgeEnd = 0,      // ← 필요하면 조금만(예: 8~16) 주기
  releaseUnits = 1, // ← 기본 100vh, 줄이고 싶으면 0.3~0.5 추천
  className = "",
}: ScrollMockTrackProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapW, setWrapW] = useState(0);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const el = wrapperRef.current;
    const update = () => setWrapW(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const n = slides.length;

  // 1) 가시 카드 폭(렌더와 동일한 값)을 한 번만 계산
  const cardW = Math.min(phoneWidth, wrapW * 0.9) || phoneWidth;
  const step = cardW + gap;

  // 2) 트랙 전체 너비와 뷰포트 너비로 최대 이동량(px) 산출
  const contentW = edgeStart + n * cardW + (n - 1) * gap + edgeEnd;
  const viewportW = wrapW || cardW;
  const maxTranslate = Math.max(0, contentW - viewportW);

  // 3) tail을 도달하기 위한 progress 임계값(== 마지막 카드까지 가는 데 필요한 비율)
  const tail = edgeEnd / step;                 // 기존과 동일
  const needUnits = (n - 1) + tail + releaseUnits;
  const threshold = ((n - 1) + 0 /* 마지막 카드 직전 */) / needUnits;

  // 4) progress를 임계값 기준으로 0~1로 재매핑 → 항상 tail까지 도달
  const drive = useTransform(progress, (v) => Math.min(1, v / Math.max(threshold, 1e-6)));

  // 5) 최종 x는 최대 이동량을 선형으로 사용
  const x = useSpring(useTransform(drive, (t) => -t * maxTranslate), {
    damping: 32, stiffness: 200, mass: 0.4
  });

  return (
    <div ref={wrapperRef} className={`relative w-full h-full md:flex md:items-center ${className}`}>
      <motion.div
        className="absolute left-0 flex"
        style={{ x, gap }}
      >
        {/* ← 첫 카드 앞 여백 */}
        {edgeStart > 0 && <div style={{ width: edgeStart }} />}

        {slides.map((slide, i) => (
          <div
            key={i}
            className="shrink-0 rounded-[28px] bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.12)] overflow-hidden"
            style={{ width: cardW || phoneWidth, height: phoneHeight }}
          >
            {slide}
          </div>
        ))}

        {/* → 마지막 카드 뒤 여백 */}
        {edgeEnd > 0 && <div style={{ width: edgeEnd }} />}
      </motion.div>
    </div>
  );
}
