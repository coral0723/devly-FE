"use client";

import { BookOpen, Lightbulb, GitPullRequest, MessageSquare } from "lucide-react";
import LogoLoop from "../_animations/LogoLoop";
import { RefObject, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import SplitText from "../_animations/SplitText";

type Props = {
  scrollContainerRef?: RefObject<Element | null>;
};

const techLogos = [
  {
    node: (
      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
        <BookOpen className="w-8 h-8 text-emerald-500" />
      </div>
    ),
    title: "개발 용어",
  },
  {
    node: (
      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
        <Lightbulb className="w-8 h-8 text-blue-500" />
      </div>
    ),
    title: "CS 지식",
  },
  {
    node: (
      <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
        <GitPullRequest className="w-8 h-8 text-purple-500" />
      </div>
    ),
    title: "모의 PR",
  },
  {
    node: (
      <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
        <MessageSquare className="w-8 h-8 text-orange-500" />
      </div>
    ),
    title: "모의 면접",
  },
];

export default function SolutionSection({ scrollContainerRef }: Props) {
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
      className="h-screen w-full snap-start flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-5xl flex flex-col justify-center">
        <SplitText
          text="devly가 해결합니다"
          className="text-center font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
          trigger="manual"
          in={started}
          delay={45}
          duration={0.5}
          ease="power3.out"
          from={{ opacity: 0, y: 36 }}
          to={{ opacity: 1, y: 0 }}
        />

        <SplitText
          text="개발자가 놓치기 쉬운 공부를 AI와 함께, 작은 단위로, 매일 쌓아가세요"
          className="mt-2 text-center text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl"
          trigger="manual"
          in={started} 
          splitType="words"
          delay={45}
          duration={0.5}
          ease="power3.out"
          from={{ opacity: 0, y: 24 }}
          to={{ opacity: 1, y: 0 }}
        />

        <div className="mt-12" style={{ height: '200px', position: 'relative', overflow: 'hidden'}}>
          <LogoLoop
            logos={techLogos}
            speed={120}
            direction="left"
            logoHeight={48}
            gap={40}
            pauseOnHover={false}
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Technology partners"
          />
        </div>
      </div>
    </section>
  );
}
