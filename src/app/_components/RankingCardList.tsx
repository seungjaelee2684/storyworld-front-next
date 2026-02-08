import { VerticalCard } from "@/components/VerticalCard";
import { StoryType } from "@/types/storyType";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function RankingCardList({ data }: { data: StoryType[] }) {

    return (
        <section className="w-full flex flex-col gap-4">
            <div className="w-full flex justify-between items-center">
                <div className="flex flex-col">
                    <h2 className="font-semibold">
                        일간 인기 스토리
                    </h2>
                    <p className="text-xs leading-normal text-foreground/70">
                        일간 인기 스토리를 소개합니다.
                    </p>
                </div>
                <Link href="/story/ranking" className="flex items-center justify-center">
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
            <ul className="w-full flex items-center gap-4">
                {data.map((item) => (
                    <VerticalCard
                        key={item.id}
                        size="lg"
                        href={`/story/${item.id}`}
                        storyItem={item} />
                ))}
            </ul>
        </section>
    )
}