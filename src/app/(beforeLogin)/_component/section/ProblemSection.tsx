// ProblemSection.tsx
"use client";

import { RefObject, useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import SplitText from "../../_animations/SplitText";

type Props = {
  scrollContainerRef?: RefObject<Element | null>;
};

export default function ProblemSection({ scrollContainerRef }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);      // 애니메이션 시작

  const fullyInView = useInView(sectionRef, {
    root: scrollContainerRef,
    amount: 0.9,
    margin: "0px",
    once: true,
  });

  useEffect(() => {
    if (fullyInView) 
      setStarted(true);
  }, [fullyInView]);

  return (
    <section
      ref={sectionRef}
      className="h-screen supports-[height:100svh]:h-[100svh] w-full snap-start flex items-center justify-center px-6"
    >
      <div className="max-w-3xl text-center">
        <SplitText
          text="개발자들이 놓치기 쉬운 공부들"
          className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6"
          trigger="manual"
          in={started}
          delay={45}
          duration={0.5}
          ease="power3.out"
          from={{ opacity: 0, y: 36 }}
          to={{ opacity: 1, y: 0 }}
        />

        <SplitText
          text={`코딩 실력만으로는 부족합니다
영어 문서 읽기, CS 기초, 협업과 커뮤니케이션, 면접 준비까지
하지만 이런 것들을 꾸준히 공부하기 쉽지 않죠`}
          className="text-gray-700 whitespace-pre-line leading-relaxed text-base sm:text-lg md:text-xl lg:text-2xl"
          trigger="manual"
          in={started} 
          splitType="words"
          delay={45}
          duration={0.5}
          ease="power3.out"
          from={{ opacity: 0, y: 24 }}
          to={{ opacity: 1, y: 0 }}
        />
      </div>
    </section>
  );
}
