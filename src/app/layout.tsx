import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MSWProvider } from "./_component/MSWComponent";
import RQProvider from "./(afterLogin)/_component/RQProvider";

// SSR용 MSW 코드
// if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_MSW_ENABLED !== 'false') {
//   const { server } = require('@/mocks/http');
//   server.listen();
// };

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: "no",
  viewportFit: 'cover',
};

export const metadata: Metadata = {
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
        <MSWProvider>
          <RQProvider>
            {children}
          </RQProvider>
        </MSWProvider>
      </body>
    </html>
  );
}
