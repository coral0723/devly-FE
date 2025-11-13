import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MSWProvider } from "./_component/MSWComponent";
import RQProvider from "./(afterLogin)/_component/RQProvider";
import TopLoader from "./_component/TopLoader";

// SSR용 MSW 코드
if (
  process.env.NEXT_RUNTIME === "nodejs" &&
  process.env.NEXT_PUBLIC_API_MOCKING !== "false"
) {
  (async () => {
    const { server } = await import("@/mocks/http");
    server.listen();
  })();
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 모바일 UI 안정성을 위한 설정
export const viewport = {
  width: "device-width", // 화면 전체 너비 사용
  initialScale: 1.0, // 처음 확대 비율
  maximumScale: 1.0, // 최대 확대 제한
  userScalable: "no", // 유저의 확대/축소 금지
  viewportFit: 'cover', // Iphone notch 영역까지 UI 사용 가능
};

export const metadata: Metadata = {
  metadataBase: new URL("https://devly-ten.vercel.app"),
  title: { default: "devly", template: "%s · devly" },
  description: "개발자 학습을 더 쉽게",
  icons: {
    icon: [{ url: "/logo.png" }],     // 탭 아이콘(파비콘)
    apple: [{ url: "/logo.png" }],    // iOS 홈화면 아이콘
  },
  openGraph: {
    title: "devly",
    description: "개발자 학습을 더 쉽게",
    images: ["/logo.png"],            // SNS 미리보기 이미지
  },
  twitter: {
    card: "summary_large_image",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TopLoader/>
        <MSWProvider>
          <RQProvider>
            {children}
          </RQProvider>
        </MSWProvider>
      </body>
    </html>
  );
}
