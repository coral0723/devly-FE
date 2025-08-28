"use client";

import { motion, useInView } from "framer-motion";
import ShinyText from "../../_animations/ShynyText";
import SplitText from "../../_animations/SplitText";
import { RefObject, useEffect, useRef, useState } from "react";

type Props = {
  scrollContainerRef: RefObject<Element | null>;
}

export default function LastSection({ scrollContainerRef }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);      // 애니메이션 시작

  const handleScrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

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
    <motion.section
      className="h-screen w-full flex flex-col items-center justify-center snap-start px-6"
      ref={sectionRef}
    >
      <div className="flex flex-col">
        <SplitText
          text="하루 한 걸음,"
          className="text-xl font-bold mb-0 sm:text-3xl sm:mb-3 lg:mb-6 lg:text-5xl"
          trigger="manual"
          in={started}
          delay={45}
          duration={0.5}
          ease="power3.out"
          from={{ opacity: 0, y: 36 }}
          to={{ opacity: 1, y: 0 }}
        />
        <SplitText
          text="지금 학습의 첫 걸음을 내딛어보세요."
          className="text-xl font-bold mb-0 sm:text-3xl sm:mb-3 lg:mb-6 lg:text-5xl"
          trigger="manual"
          in={started}
          delay={45}
          duration={0.5}
          ease="power3.out"
          from={{ opacity: 0, y: 36 }}
          to={{ opacity: 1, y: 0 }}
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
