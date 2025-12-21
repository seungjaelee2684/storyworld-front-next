import { VerticalCard } from "@/components/VerticalCard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function RecommandCardList() {

  const list = new Array(10).fill(0).map((_, index) => {
    return {
      id: index + 1,
      title: `스토리 ${index + 1} 제목은 여기에 들어갑니다.`,
      description: `스토리 ${index + 1} 설명`,
      genre: `장르 ${index + 1}`,
      thumbnail: `/images/static_images/backgrounds/background${(index + 1) % 4}.webp`,
      author: `작가 ${index + 1}`,
      like_count: Math.floor(Math.random() * 100),
      view_count: Math.floor(Math.random() * 100),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  });

  return (
    <section className="w-full flex flex-col gap-4">
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="font-semibold">
            추천 스토리
          </h2>
          <p className="text-xs leading-normal text-foreground/70">
            추천 스토리를 소개합니다.
          </p>
        </div>
        <Link href="/story/ranking" className="flex items-center justify-center">
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <ul className="w-full grid grid-cols-7 items-center gap-2">
        {list.map((item) => (
          <VerticalCard
            key={item.id}
            href={`/story/${item.id}`}
            storyItem={item} />
        ))}
      </ul>
    </section>
  )
}