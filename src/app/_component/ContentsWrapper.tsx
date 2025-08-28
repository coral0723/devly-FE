"use client";

import { ReactNode, useMemo, forwardRef } from "react";
import { useMediaQuery } from "./hook/UseMediaQuery";

type Props = {
  children: ReactNode;
  headerMobileHeight: number;  
  headerDesktopHeight: number;  
  className?: string;
};

const ContentsWrapper = forwardRef<HTMLDivElement, Props>(function ContentsWrapper(
  { children, headerMobileHeight, headerDesktopHeight, className = "" },
  ref
) {
  const isMdUp = useMediaQuery("(min-width: 768px)");

  const paddingTopPx = useMemo(() => {
    return isMdUp
      ? headerDesktopHeight + 16  // 데스크탑: +16px
      : headerMobileHeight + 8;   // 모바일:  +8px
  }, [isMdUp, headerDesktopHeight, headerMobileHeight]);

  return (
    <div
      ref={ref}
      className={`px-2 space-y-2 md:space-y-4 md:px-4 scrollbar-hide ${className}`}
      style={{ paddingTop: `${paddingTopPx}px` }}
    >
      {children}
    </div>
  );
});

export default ContentsWrapper;
