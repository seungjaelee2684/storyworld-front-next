import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PageLayout } from "@/app/_components/PageLayout";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "스토리월드",
    template: "%s | 스토리월드",
  },
  description: "스토리월드는 소설을 쓰고 읽는 공간입니다.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: ["스토리월드", "소설", "소설 쓰기", "소설 읽기", "storyworld", "story"],
  authors: [{ name: "StoryWorld", url: "https://storyworld.com" }],
  creator: "StoryWorld",
  publisher: "StoryWorld",
  openGraph: {
    title: "스토리월드",
    description: "스토리월드는 소설을 쓰고 읽는 공간입니다.",
    images: [
      {
        url: `/images/logo.png`,
        width: 1200,
        height: 630,
        alt: "스토리월드",
        type: "image/png",
      },
    ],
    type: "website",
    siteName: "스토리월드",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "스토리월드",
    description: "스토리월드는 소설을 쓰고 읽는 공간입니다.",
    images: [`/images/logo.png`],
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
        <Providers>
          <PageLayout>
            {children}
          </PageLayout>
        </Providers>
      </body>
    </html>
  );
}
