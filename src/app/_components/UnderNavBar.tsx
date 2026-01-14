import { Archive, Home, Trophy, User } from "lucide-react";
import Link from "next/link";

const navItems = [
    {
        label: "홈으로",
        icon: <Home className="size-5" />,
        href: "/",
    },
    {
        label: "랭킹보기",
        icon: <Trophy className="size-5" />,
        href: "/ranking",
    },
    {
        label: "저장소",
        icon: <Archive className="size-5" />,
        href: "/storage",
    },
    {
        label: "내계정",
        icon: <User className="size-5" />,
        href: "/profile",
    }
]

export function UnderNavBar() {
    return (
        <aside className="w-full h-14.5 min-h-14.5 border-t-1">
            <nav className="w-full h-full">
                <ul className="w-full h-full flex justify-around items-center">
                    {navItems.map((nav) => {
                        return (
                            <li key={nav.label}>
                                <Link
                                    href={nav.href}
                                    className="text-[10px] text-zinc-500 hover:text-foreground transition-all cursor-pointer flex flex-col items-center gap-1">
                                    {nav.icon}
                                    <span>
                                        {nav.label}
                                    </span>
                                </Link>
                            </li>
                        )
                    }
                    )}
                </ul>
            </nav>
        </aside>
    )
}