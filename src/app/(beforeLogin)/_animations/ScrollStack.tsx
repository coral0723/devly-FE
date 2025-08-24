"use client";

import React, {
  ReactNode,
  useLayoutEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import Lenis from "lenis";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div
    className={`scroll-stack-card flex relative w-full h-[70vh] my-2 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
    }}
  >
    {children}
  </div>
);

export interface ScrollStackHandle {
  scrollBy: (deltaY: number) => void;
  isAtStart: () => boolean;
  isAtEnd: () => boolean;
  getScroller: () => HTMLDivElement | null;
}

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string | number;
  scaleEndPosition?: string | number;
  baseScale?: number;
  scaleDuration?: number; // 현재는 CSS transition 대신 즉시 반영(성능 위해 유지만)
  rotationAmount?: number;
  blurAmount?: number;
  onStackComplete?: () => void;

  /** ✅ 부모가 스크롤 주도권을 관리할 때 true로 설정 */
  managedByParent?: boolean;
}

interface TransformValues {
  translateY: number;
  scale: number;
  rotation: number;
  blur: number;
}

const ScrollStack = forwardRef<ScrollStackHandle, ScrollStackProps>(function ScrollStack(
  {
    children,
    className = "",
    itemDistance = 120,
    itemScale = 0.03,
    itemStackDistance = 30,
    stackPosition = "5%",
    scaleEndPosition = "0%",
    baseScale = 0.85,
    scaleDuration = 0.5,
    rotationAmount = 0,
    blurAmount = 0,
    onStackComplete,
    managedByParent = false,
  },
  ref
) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef<Map<number, TransformValues>>(new Map());
  const isUpdatingRef = useRef(false);
  const stackCompletedRef = useRef(false);

  // ----- helpers -----
  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop <= start) return 0;
    if (scrollTop >= end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return typeof value === "number" ? value : parseFloat(value);
  }, []);

  const updateCardTransforms = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const scrollTop = scroller.scrollTop;
    const containerHeight = scroller.clientHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElement = scroller.querySelector(".scroll-stack-end") as HTMLElement | null;
    const endElementTop = endElement ? endElement.offsetTop : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = card.offsetTop;

      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;

      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = Math.max(pinStart, endElementTop - containerHeight / 2);

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale; // 뒤로 갈수록 조금 더 작거나 크게
      const scale = 1 - scaleProgress * (1 - targetScale);

      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      // blur: 현재 가장 위 카드보다 아래 있는 카드들에만 블러
      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = cardsRef.current[j].offsetTop;
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }
        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      // translateY pin 처리
      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform: TransformValues = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const changed =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (changed) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        card.style.filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : "";
        lastTransformsRef.current.set(i, newTransform);
      }

      // 마지막 카드가 뷰에 고정돼 진행 중일 때 onStackComplete 한번만 콜
      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
  ]);

  // 내부 스크롤 변화 시 카드 업데이트
  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  // ✅ 부모 제어 모드가 아닐 때만 내부에서 휠 제어 (원래 동작 유지)
  const handleWheel = useCallback((e: WheelEvent) => {
    if (managedByParent) return; // 부모 제어 모드에서는 휠을 건드리지 않음

    const scroller = scrollerRef.current;
    if (!scroller) return;

    const currentScrollTop = scroller.scrollTop;
    const isAtEnd = currentScrollTop >= scroller.scrollHeight - scroller.clientHeight - 10;
    const isAtStart = currentScrollTop <= 10;
    const scrollingDown = e.deltaY > 0;
    const scrollingUp = e.deltaY < 0;

    // 끝에서 아래로 → 페이지에 넘김(기본 동작 허용)
    if (scrollingDown && isAtEnd) {
      document.body.style.overflow = "auto";
      scroller.style.pointerEvents = "none";
      return; // default
    }

    // 시작에서 위로 → 페이지에 넘김(기본 동작 허용)
    if (scrollingUp && isAtStart) {
      document.body.style.overflow = "auto";
      scroller.style.pointerEvents = "none";
      return; // default
    }

    // 그 외에는 내부에서 처리
    e.preventDefault();
    document.body.style.overflow = "hidden";
    scroller.style.pointerEvents = "auto";
  }, [managedByParent]);

  // Lenis 세팅
  const setupLenis = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const content = scroller.querySelector(".scroll-stack-inner") as HTMLElement | null;
    if (!content) return;

    const lenis = new Lenis({
      wrapper: scroller,
      content,
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !managedByParent, // ✅ 부모 제어면 내부 휠 스무스 스크롤 비활성
      gestureOrientation: "vertical",
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
    });

    lenis.on("scroll", handleScroll);

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [handleScroll, managedByParent]);

  // 초기화 & 정리
  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // 카드 DOM 수집 및 초기 스타일
    const cards = Array.from(scroller.querySelectorAll(".scroll-stack-card")) as HTMLElement[];
    cardsRef.current = cards;
    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      (card.style as any).webkitTransform = "translateZ(0)";
      (card.style as any).webkitPerspective = "1000px";
    });

    // ✅ 부모 제어가 아닐 때만 내부 휠 리스너/바디 오버플로 제어
    if (!managedByParent) {
      document.body.style.overflow = "hidden";
      scroller.addEventListener("wheel", handleWheel, { passive: false });
    }

    const cleanupLenis = setupLenis();
    updateCardTransforms();

    return () => {
      // cleanup
      if (!managedByParent) {
        document.body.style.overflow = "auto";
        scroller.removeEventListener("wheel", handleWheel as any);
      }
      if (cleanupLenis) cleanupLenis();
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      stackCompletedRef.current = false;
      isUpdatingRef.current = false;
    };
  }, [
    managedByParent,
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    onStackComplete,
    handleWheel,
    setupLenis,
    updateCardTransforms,
  ]);

  // ----- 부모 제어용 핸들 노출 -----
  useImperativeHandle(ref, () => ({
    scrollBy: (deltaY: number) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      // Lenis가 있더라도 즉시 반응이 중요하니 scrollTop 직접 변경
      scroller.scrollTop += deltaY;
      // 변경 후 트랜스폼 업데이트
      updateCardTransforms();
    },
    isAtStart: () => {
      const scroller = scrollerRef.current;
      if (!scroller) return true;
      return scroller.scrollTop <= 1;
    },
    isAtEnd: () => {
      const scroller = scrollerRef.current;
      if (!scroller) return false;
      return scroller.scrollTop >= scroller.scrollHeight - scroller.clientHeight - 1;
    },
    getScroller: () => scrollerRef.current,
  }));

  return (
    <div
      className={`relative w-full h-full overflow-y-auto scrollbar-hide overflow-x-visible ${className}`.trim()}
      ref={scrollerRef}
      style={{
        overscrollBehavior: managedByParent ? "auto" : "contain",
        WebkitOverflowScrolling: "touch",
        scrollBehavior: "auto",
        WebkitTransform: "translateZ(0)",
        transform: "translateZ(0)",
        willChange: "scroll-position",
      }}
    >
      <div className="scroll-stack-inner min-h-screen w-full max-w-7xl mx-auto">
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end w-full h-[1px]" />
      </div>
    </div>
  );
});

export default ScrollStack;
