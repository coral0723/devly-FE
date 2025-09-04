import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  const { pathname } = req.nextUrl;

  // 1. 토큰이 없으면 → 로그인 페이지(/)로 리다이렉트
  if (!token && pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 2. 토큰이 있는데 현재 "/" 라우트라면 → /home 으로 리다이렉트
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // 3. 그 외엔 통과
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home", "/word", "/knowledge", "/pr", "/interview", "/review", "/ranking", "/community", "/profile"],
};
