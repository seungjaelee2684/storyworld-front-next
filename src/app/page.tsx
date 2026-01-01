'use client';

import { Suspense } from "react";
import { RecommandCardList } from "./_components/RecommandCardList";
import { RankingCardList } from "./_components/RankingCardList";
import { HomeTitle } from "./_components/HomeTitle";
import { useStoriesInquiry } from "@/hooks/stories/useStoriesInquiry";

function HomeContent() {
  const {data} = useStoriesInquiry({page: 1});
  console.log(data);
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
    <Suspense fallback={<div className="w-full flex items-center justify-center p-10">로딩 중...</div>}>
      <HomeContent />
    </Suspense>
  );
}
