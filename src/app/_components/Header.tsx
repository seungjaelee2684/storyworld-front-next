'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useLogout } from "@/hooks/auth/useAuth";
import { useMe } from "@/hooks/auth/useMe";
import { authStore } from "@/store/authStore";
import { Archive, Bell, LogOut, Search, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Header() {

  const router = useRouter();
  const isLogged = authStore(state => state.isLogged);
  const {data: me} = useMe();
  const {mutateAsync: logout} = useLogout();

  const handleClickLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <header className="w-full h-17.5 min-h-17.5 flex justify-between items-center px-4">
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
              <Link href="/notice" className="text-zinc-500 dark:text-zinc-400 hover:text-foreground transition-colors">
                <Bell className="w-5 h-5" />
              </Link>
            </li>
            <li>
              {isLogged
                ? <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="text-zinc-500 dark:text-zinc-400 hover:text-foreground transition-colors cursor-pointer">
                      <User className="w-5 h-5" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>{me?.nickname ? `${me.nickname} 님` : "닉네임을 설정해주세요."}</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="justify-between">
                        프로필
                        <User className="w-4 h-4" />
                      </DropdownMenuItem>
                      <DropdownMenuItem className="justify-between">
                        저장소
                        <Archive className="w-4 h-4" />
                      </DropdownMenuItem>
                      <DropdownMenuItem className="justify-between">
                        설정
                        <Settings className="w-4 h-4" />
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="justify-between" onClick={handleClickLogout}>
                      로그아웃
                      <LogOut className="w-4 h-4" />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                : <Link href="/auth/login" className="text-zinc-500 dark:text-zinc-400 hover:text-foreground transition-colors">
                  <User className="w-5 h-5" />
                </Link>}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}