import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });

  // accessToken 쿠키를 삭제 (빈 값 + maxAge=0)
  res.cookies.set("accessToken", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0, // 즉시 만료
  });

  return res;
}
