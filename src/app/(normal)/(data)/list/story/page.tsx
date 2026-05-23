'use client';

import { useStoriesInquiry } from "@/hooks/stories/useStoriesInquiry";
import { StoryType } from "@/types/storyType";

const StoryListContent = ({data}: {data: StoryType[]}) => {
    return (
        <div>

        </div>
    )
};

export default function StoryList() {

    const {data, isLoading} = useStoriesInquiry({});

    return (
        <section className="w-full flex flex-col gap-10 pt-4">
            <article className="flex flex-col">
                <h1 className="text-lg font-bold leading-normal">
                    스토리 목록
                </h1>
                <p className="text-sm leading-normal text-foreground/70">
                    스토리 목록을 소개합니다.
                </p>
            </article>
            <StoryListContent data={data} />
        </section>
    )
}