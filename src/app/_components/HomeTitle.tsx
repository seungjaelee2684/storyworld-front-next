import { FilterTab } from "@/components/FilterTab";
import Link from "next/link";

export function HomeTitle() {
    return (
        <section className="w-full flex justify-between items-center gap-2">
            <div className="flex items-center gap-4">
                <h1 className="text-lg font-bold leading-normal">
                    스토리
                </h1>
                <FilterTab />
            </div>
            <Link href="/story/create" className="text-sm bg-primary rounded-sm px-4 py-1.5 text-white">
                CREATE
            </Link>
        </section>
    )
}