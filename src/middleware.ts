import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  if (!token) {
    // 토큰이 없으면 로그인 페이지로 리다이렉트
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 토큰이 있으면 통과
  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/word", "/knowledge", "/pr", "/interview", "/review", "/ranking", "/community", "/profile"],
};
