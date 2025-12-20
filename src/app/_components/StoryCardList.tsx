import { VerticalCard } from "@/components/VerticalCard";

export function StoryCardList() {

  const list = new Array(10).fill(0).map((_, index) => index);

  return (
    <section className="w-full flex flex-col gap-4">
      <ul className="w-full grid grid-cols-6 items-center gap-2">
        {list.map((item) => (
          <VerticalCard key={item} href={`/story/${item + 1}`} />
        ))}
      </ul>
    </section>
  )
}