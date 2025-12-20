'use client';

import { FilterTab } from "@/components/FilterTab";
import { PageLayout } from "./_components/PageLayout";
import { StoryCardList } from "./_components/StoryCardList";

export default function Home() {
  return (
    <PageLayout>
      <article className="w-full flex flex-col gap-4 py-4">
        <section className="w-full flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold leading-normal">
              스토리
            </h1>
            <FilterTab />
          </div>
          <p className="text-sm leading-normal text-foreground/70">
            스토리월드는 나만의 스토리를 만들고 공유할 수 있는 공간입니다.
          </p>
        </section>
        <StoryCardList />
      </article>
    </PageLayout>
  );
}
