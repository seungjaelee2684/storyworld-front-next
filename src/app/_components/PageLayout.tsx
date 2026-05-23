import { Header } from "./Header";
import { UnderNavBar } from "./UnderNavBar";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[100dvh] max-h-[100dvh] overflow-hidden items-center justify-center bg-muted font-sans dark:bg-black">
      <main className="flex h-full max-h-full w-full max-w-5xl flex-col items-center justify-between overflow-hidden bg-white dark:bg-black sm:items-start relative">
        <Header/>
        <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto px-4">
          <div className="flex min-h-full flex-1 flex-col pb-10">
            {children}
          </div>
        </div>
        <UnderNavBar/>
      </main>
    </div>
  );
}