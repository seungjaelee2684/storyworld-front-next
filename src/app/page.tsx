'use client';

import { RecommandCardList } from "./_components/RecommandCardList";
import { RankingCardList } from "./_components/RankingCardList";
import { HomeTitle } from "./_components/HomeTitle";

export default function Home() {
  return (
    <article className="w-full flex flex-col gap-10 pt-4 pb-10">
      <HomeTitle />
      <RankingCardList />
      <RecommandCardList />
    </article>
  );
}
