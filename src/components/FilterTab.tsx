import { useGetSearchParams } from "@/hooks/params/useGetSearchParams";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Fragment } from "react";

type TabType = {
  label: string;
  value: string;
}

const tabs: TabType[] = [
  {
    label: "전체",
    value: "all",
  },
  {
    label: "인기순",
    value: "popular",
  },
  {
    label: "별점순",
    value: "rating",
  },
  {
    label: "최신순",
    value: "new",
  }
]

export function FilterTab() {
  const currentParams = useGetSearchParams("tab");
  
  return (
    <nav className="flex items-center gap-2 text-sm">
      {tabs.map((item, index) => {
        const isActive = item.label === "전체" ? currentParams === item.value || currentParams === "" : currentParams === item.value;

        return (
          <Fragment key={item.value}>
            <Link href={`?tab=${item.value}`} className={cn(
              isActive ? "text-foreground font-medium" : "text-foreground/70",
              "hover:text-foreground")}>
              {item.label}
            </Link>
            {index !== tabs.length - 1 && <div className="w-1 h-1 bg-foreground/20 rounded-full" />}
          </Fragment>
        )
      })}
    </nav>
  )
}