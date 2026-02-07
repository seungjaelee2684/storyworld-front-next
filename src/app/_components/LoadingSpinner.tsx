import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";

export function LoadingSpinner({isLoading}: {isLoading: boolean}) {

    const loadingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isLoading) {
            if (!loadingRef.current) return;
            loadingRef.current.style.display = "flex";
            setTimeout(() => {
                if (!loadingRef.current) return;
                loadingRef.current.style.opacity = "1";
            }, 300)
        } else {
            if (!loadingRef.current) return;
            loadingRef.current.style.opacity = "0";
            setTimeout(() => {
                if (!loadingRef.current) return;
                loadingRef.current.style.display = "hidden";
            }, 300)
        }
    }, [isLoading])

    return (
        <div ref={loadingRef} className={cn(
            "w-screen h-screen fixed top-0 left-0 z-10 bg-black/50 dark:bg-white/50 backdrop-blur-sm",
            "transition-all text-white text-2xl font-bold dark:text-black",
            "hidden opacity-0"
        )}>
            <div className="flex flex-col items-center gap-4 m-auto">
                <Loader className="size-10 animate-spin" />
                <p>
                    로딩 중...
                </p>
            </div>
        </div>
    )
}