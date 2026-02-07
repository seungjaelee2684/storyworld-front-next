import { Header } from "./Header";
import { UnderNavBar } from "./UnderNavBar";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[100dvh] max-h-[100dvh] overflow-hidden items-center justify-center bg-zinc-100 font-sans dark:bg-black">
      <main className="flex h-full max-h-full w-full max-w-5xl flex-col items-center justify-between overflow-hidden bg-white dark:bg-black sm:items-start">
        <Header/>
        <div className="w-full min-h-0 flex-1 overflow-y-auto px-4">
          <div className="min-h-full pb-10">
            {children}
          </div>
        </div>
        <UnderNavBar/>
      </main>
    </div>
  );
}