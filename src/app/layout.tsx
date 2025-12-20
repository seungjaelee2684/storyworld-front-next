import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "스토리월드",
    template: "%s | 스토리월드",
  },
  description: "스토리월드는 소설을 쓰고 읽는 공간입니다.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: ["스토리월드", "소설", "소설 쓰기", "소설 읽기"],
  authors: [{ name: "StoryWorld", url: "https://storyworld.com" }],
  creator: "StoryWorld",
  publisher: "StoryWorld",
  openGraph: {
    title: "스토리월드",
    description: "스토리월드는 소설을 쓰고 읽는 공간입니다.",
    images: "/images/logo.png",
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
