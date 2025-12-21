import { Input } from "@/components/ui/input";
import { Archive, Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="w-full h-17.5 flex justify-between items-center px-4">
      <nav className="w-full flex justify-between items-center gap-4">
        <Link href="/">
          <Image src="/images/logo.png" alt="logo" width={150} height={100} className="w-[150px] h-full" />
        </Link>
        <div className="flex items-center gap-6">
          <div className="h-9 flex items-center gap-2 border-1 rounded-full pl-2 pr-4 focus-within:ring-1 focus-within:ring-primary">
            <Input
              placeholder="제목/작가를 입력해 주세요."
              className="w-full h-full border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0" />
            <Search className="w-4 h-4" />
          </div>
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/storage" className="text-zinc-500 dark:text-zinc-400 hover:text-foreground transition-colors">
                <Archive className="w-5 h-5" />
              </Link>
            </li>
            <li>
              <Link href="/login" className="text-zinc-500 dark:text-zinc-400 hover:text-foreground transition-colors">
                <User className="w-5 h-5" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}