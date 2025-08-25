// SplitText.tsx
"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number; // ms 단위 간격
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;

  /** ── 스크롤 트리거 옵션(기본값: scroll) ── */
  trigger?: "scroll" | "manual";
  threshold?: number;
  rootMargin?: string;

  /** ── 수동 시작용: trigger="manual"일 때만 사용 ── */
  in?: boolean;

  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },

  trigger = "scroll",
  threshold = 0.1,
  rootMargin = "-100px",

  in: manualIn = false,

  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const animationCompletedRef = useRef(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current || !text) return;

    const el = ref.current;
    animationCompletedRef.current = false;

    const absoluteLines = splitType === "lines";
    if (absoluteLines) el.style.position = "relative";

    let splitter: GSAPSplitText | null = null;
    try {
      splitter = new GSAPSplitText(el, {
        type: splitType,
        absolute: absoluteLines,
        linesClass: "split-line",
      });
    } catch (error) {
      console.error("Failed to create SplitText:", error);
      return;
    }

    let targets: Element[] = [];
    switch (splitType) {
      case "lines":
        targets = splitter.lines;
        break;
      case "words":
        targets = splitter.words;
        break;
      case "chars":
        targets = splitter.chars;
        break;
      default:
        targets = splitter.chars;
    }

    if (!targets || targets.length === 0) {
      console.warn("No targets found for SplitText animation");
      splitter.revert();
      return;
    }

    targets.forEach((t) => {
      (t as HTMLElement).style.willChange = "transform, opacity";
    });

    const makeTimeline = (withScrollTrigger: boolean) => {
      const tl = gsap.timeline({
        ...(withScrollTrigger
          ? {
              scrollTrigger: {
                trigger: el,
                start: (() => {
                  const startPct = (1 - threshold) * 100;
                  const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
                  const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
                  const marginUnit = marginMatch ? (marginMatch[2] || "px") : "px";
                  const sign =
                    marginValue < 0
                      ? `-=${Math.abs(marginValue)}${marginUnit}`
                      : `+=${marginValue}${marginUnit}`;
                  return `top ${startPct}%${sign}`;
                })(),
                toggleActions: "play none none none",
                once: true,
                onToggle: (self) => {
                  scrollTriggerRef.current = self;
                },
              },
            }
          : {}),
        smoothChildTiming: true,
        onComplete: () => {
          animationCompletedRef.current = true;
          gsap.set(targets, {
            ...to,
            clearProps: "willChange",
            immediateRender: true,
          });
          onLetterAnimationComplete?.();
        },
      });

      tl.set(targets, { ...from, immediateRender: false, force3D: true });
      tl.to(targets, {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        force3D: true,
      });

      return tl;
    };

    // ── 모드에 따라 시작 방식 분기 ──
    let tl: gsap.core.Timeline | null = null;

    if (trigger === "scroll") {
      tl = makeTimeline(true);
    } else {
      // manual: in=true일 때만 재생
      if (manualIn) {
        tl = makeTimeline(false);
      } else {
        // 수동 대기 상태에서도 from 상태를 먼저 세팅해 빈 화면처럼 보이지 않게 하려면 아래 세팅 유지
        gsap.set(targets, { ...from, force3D: true });
      }
    }

    return () => {
      tl?.kill();
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      gsap.killTweensOf(targets);
      splitter?.revert();
    };
    // manual 모드에서는 manualIn도 의존성에 포함 (true로 바뀔 때 시작)
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    from,
    to,
    trigger,
    threshold,
    rootMargin,
    manualIn,
    onLetterAnimationComplete,
  ]);

  return (
    <p
      ref={ref}
      className={`split-parent overflow-hidden inline-block whitespace-normal ${className}`}
      style={{
        textAlign,
        wordWrap: "break-word",
      }}
    >
      {text}
    </p>
  );
};

export default SplitText;
