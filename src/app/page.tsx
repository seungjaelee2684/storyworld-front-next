'use client';

import { RecommandCardList } from "./_components/RecommandCardList";
import { RankingCardList } from "./_components/RankingCardList";
import { HomeTitle } from "./_components/HomeTitle";
import { useLandingInquiry } from "@/hooks/landing/useLandingInquiry";
import { LoadingSpinner } from "./_components/LoadingSpinner";
import { LandingType } from "@/types/landingType";

// function HomeSkeleton() {
//   return (
//     <article className="w-full flex flex-col gap-10 pt-4">
//       <HomeTitle />
//       <RankingCardList />
//       <RecommandCardList />
//     </article>
//   )
// }

function HomeContent({data}: {data: LandingType}) {
  console.log(data);
  return (
    <article className="w-full flex flex-col gap-10 pt-4">
      <HomeTitle />
      <RankingCardList />
      <RecommandCardList />
    </article>
  );
}

export default function Home() {
  const {data, isLoading} = useLandingInquiry();
  if (!data) return <LoadingSpinner isLoading={isLoading} />;
  
  return (
    <HomeContent data={data} />
  );
}
