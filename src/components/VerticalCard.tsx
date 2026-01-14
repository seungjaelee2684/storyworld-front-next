import { StoryType } from "@/types/storyType";
import { Pin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface VerticalCardProps {
  size?: "md" | "lg";
  href: string;
  storyItem: StoryType;
}

export function VerticalCard({
  size = "md",
  href,
  storyItem
}: VerticalCardProps) {

  if (size === "md") {
    return (
      <li className="w-full">
        <Link href={href} className="w-full h-full flex flex-col gap-2">
          <div className="w-full h-[160px] bg-foreground/20 rounded-lg overflow-hidden relative">
            <Image src={storyItem.thumbnail || ""} alt="thumbnail" fill className="object-cover" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="w-fit h-fit text-[8px] sm:text-[10px] bg-primary/10 text-primary rounded-sm px-1.5 py-0.5">
              {storyItem.genre}
            </span>
            <h3 className="text-[10px] sm:text-xs text-wrap break-keep">
              {storyItem.title}
            </h3>
          </div>
        </Link>
      </li>
    )
  } else {
    return (
      <li className="w-full">
        <Link href={href} className="w-full h-full flex flex-col gap-2">
          <div className="w-full h-[220px] rounded-lg overflow-hidden relative">
            <Image src={storyItem.thumbnail || ""} alt="thumbnail" fill className="object-cover" />
            <div className="flex flex-col justify-between absolute bottom-0 left-0 right-0 top-0 p-2 bg-gradient-to-t from-foreground/70 to-transparent">
              <div className="w-full flex justify-between items-center">
                <div className="p-1 rounded-sm bg-primary">
                  <Pin fill="oklch(0.15 0.01 260)" className="w-3 h-3" />
                </div>
                <span className="w-fit h-fit text-[8px] sm:text-[10px] bg-primary/80 text-white rounded-sm px-1.5 py-0.5">
                  {storyItem.genre}
                </span>
              </div>
              <h3 className="text-xs sm:text-sm text-wrap break-keep text-white font-semibold">
                {storyItem.title}
              </h3>
            </div>
          </div>
        </Link>
      </li>
    )
  }
}