'use client';

import { Suspense } from "react";
import { RecommandCardList } from "./_components/RecommandCardList";
import { RankingCardList } from "./_components/RankingCardList";
import { HomeTitle } from "./_components/HomeTitle";
import { useLandingInquiry } from "@/hooks/landing/useLandingInquiry";
import { LoadingSpinner } from "./_components/LoadingSpinner";
import { LandingType } from "@/types/landingType";

function HomeContent({ data }: { data: LandingType }) {
  return (
    <article className="w-full flex flex-col gap-10 pt-4">
      <HomeTitle />
      <RankingCardList data={data.ordered_stories} />
      <RecommandCardList data={data.random_stories} />
    </article>
  );
}

function HomeWithData() {
  const { data, isLoading } = useLandingInquiry();
  if (!data) return <LoadingSpinner isLoading={isLoading} isAbsolute={true} />;
  return <HomeContent data={data} />;
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingSpinner isLoading={true} isAbsolute={true} />}>
      <HomeWithData />
    </Suspense>
  );
}
