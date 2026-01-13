import { Header } from "./Header";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 font-sans dark:bg-black">
      <main className="flex min-h-[100svh] max-h-[100svh] w-full max-w-4xl flex-col items-center justify-between bg-white dark:bg-black sm:items-start">
        <Header />
        <div className="w-full h-full flex flex-1 overflow-y-auto px-4">
          {children}
        </div>
      </main>
    </div>
  );
}