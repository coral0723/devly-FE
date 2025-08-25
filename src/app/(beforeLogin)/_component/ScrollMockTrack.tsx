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

  // 카드 한 칸(=step) 계산
  const slideW = Math.min(phoneWidth, wrapW * 0.9);
  const step = slideW + gap;

  // ✅ edgeEnd를 step으로 나눠 "추가로 더 밀 수 있는 인덱스 비율" 계산
  const tail = edgeEnd > 0 ? edgeEnd / step : 0;

  // ✅ 전환 (n-1) + tail + 해제(releaseUnits)
  const totalUnits = (n - 1 + tail) + releaseUnits;

  // 0~1 progress → 0~totalUnits
  const raw = useTransform(progress, v => v * totalUnits);

  // ✅ 상한을 (n - 1 + tail) 로 설정해야 edgeEnd까지 미는 스크롤이 가능
  const maxIndex = n - 1 + tail;
  const clampedIndex = useTransform(raw, v => Math.min(Math.max(v, 0), maxIndex));

  // x 이동은 동일
  const x = useSpring(
    useTransform(clampedIndex, idx => -idx * step),
    { damping: 32, stiffness: 200, mass: 0.4 }
  );

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
            style={{ width: slideW || phoneWidth, height: phoneHeight }}
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
