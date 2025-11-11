import { useEffect, useState } from "react";

// 클라이언트에서만 동작하도록 SSR 안전 처리
const isClient = () => typeof window !== "undefined";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() =>
    isClient() ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    if (!isClient()) return;
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);

    // 초기 동기화
    setMatches(mql.matches);
    // 최신 표준 이벤트
    mql.addEventListener?.("change", onChange);
    // Safari 등 구버전 대응
    mql.addListener?.(onChange);

    return () => {
      mql.removeEventListener?.("change", onChange);
      mql.removeListener?.(onChange);
    };
  }, [query]);

  return matches;
}

// Tailwind 기본 브레이크포인트 
export const MQ = {
  smDown: "(max-width: 639.98px)",
  mdDown: "(max-width: 767.98px)",
  lgDown: "(max-width: 1023.98px)",
  xlDown: "(max-width: 1279.98px)",
  mdUp: "(min-width: 768px)",
  lgUp: "(min-width: 1024px)",
  xlUp: "(min-width: 1280px)",
} as const;

// 반응형 값 선택 헬퍼: 기본값 + 각 분기별 override
type ResponsiveValue<T> = {
  base: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};
export function useResponsiveValue<T>(values: ResponsiveValue<T>): T {
  const isXl = useMediaQuery(MQ.xlUp);
  const isLg = useMediaQuery(MQ.lgUp);
  const isMd = useMediaQuery(MQ.mdUp);

  if (isXl && values.xl !== undefined) return values.xl;
  if (isLg && values.lg !== undefined) return values.lg;
  if (isMd && values.md !== undefined) return values.md;
  if (!isMd && values.sm !== undefined) return values.sm;
  return values.base;
}
