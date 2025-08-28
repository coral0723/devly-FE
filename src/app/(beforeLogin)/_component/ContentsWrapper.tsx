import { ReactNode, useMemo } from "react";
import { useMediaQuery } from "./hook/UseMediaQuery";

type Props = {
  children: ReactNode;
  headerMobileHeight: number;   // px
  headerDesktopHeight: number;  // px
  className?: string;
};

export default function ContentsWrapper({
  children,
  headerMobileHeight,
  headerDesktopHeight,
  className = "",
}: Props) {
  // 뷰포트 기준으로 md 이상인지 감지 (컨테이너 폭과 무관)
  const isMdUp = useMediaQuery("(min-width: 768px)");

  const paddingTopPx = useMemo(() => {
    return isMdUp
      ? headerDesktopHeight + 16  // 데스크탑: +16px
      : headerMobileHeight + 8;   // 모바일:  +8px
  }, [isMdUp, headerDesktopHeight, headerMobileHeight]);

  return (
    <div
      className={`px-2 space-y-4 md:px-4 ${className}`}
      style={{ paddingTop: `${paddingTopPx}px` }} // 동적 px
    >
      {children}
    </div>
  );
}
