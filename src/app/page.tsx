'use client';

import { Suspense } from "react";
import { RecommandCardList } from "./_components/RecommandCardList";
import { RankingCardList } from "./_components/RankingCardList";
import { HomeTitle } from "./_components/HomeTitle";
import { Loader2 } from "lucide-react";
import { useLandingInquiry } from "@/hooks/landing/useLandingInquiry";

function HomeContent() {
  const {data} = useLandingInquiry();
  console.log("data", data);
  return (
    <article className="w-full flex flex-col gap-10 pt-4 pb-10">
      <HomeTitle />
      <RankingCardList />
      <RecommandCardList />
    </article>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="w-full flex items-center justify-center gap-4 my-auto">
        <Loader2 className="w-4 h-4 animate-spin" />
        로딩 중...
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
