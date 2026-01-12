import { useRefresh } from "@/hooks/auth/useAuth";
import { authStore } from "@/store/authStore";
import { useEffect, useRef } from "react";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
    const {isLogged, token, logout} = authStore(state => state);
    const { mutateAsync: refresh, isIdle } = useRefresh();
    const hasInitialized = useRef(false);

    useEffect(() => {
        // 초기화는 한 번만 실행
        if (hasInitialized.current) return;
        
        // token이 있지만 isLogged가 false인 경우 (sessionStorage에서 복원된 경우)
        // 또는 token이 없고 isIdle인 경우 refresh 시도
        if (token && !isLogged) {
            hasInitialized.current = true;
            const initializeAuth = async () => {
                try {
                    await refresh();
                } catch {
                    logout();
                }
            };
            initializeAuth();
        } else if (!token && isIdle && !isLogged) {
            hasInitialized.current = true;
            const initializeAuth = async () => {
                try {
                    await refresh();
                } catch {
                    logout();
                }
            };
            initializeAuth();
        }
    }, [isIdle, isLogged, token, refresh, logout]);

    return <>{children}</>;
}