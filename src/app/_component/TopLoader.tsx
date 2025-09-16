"use client";

import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";

export default function TopLoader() {
  const pathname = usePathname();

  let color = "#000000"; // 기본 black
  if (pathname.startsWith("/word")) {
    color = "#10b981"; // emerald-500
  } else if (pathname.startsWith("/knowledge")) {
    color = "#3b82f6"; // blue-500
  } else if (/^\/pr(\/|$)/.test(pathname)) { // profile 경로와 겹치기 때문에 정규식 사용
    color = "#a855f7"; // purple-500
  } else if (pathname.startsWith("/interview")) {
    color = "#f97316"; // orange-500
  }

  return (
    <NextTopLoader
      color={color}
      height={3}
      showSpinner={false}
      crawl
      crawlSpeed={200}
      speed={400}
      zIndex={9999}
    />
  );
}
