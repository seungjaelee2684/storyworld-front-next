import { useRefresh } from "@/hooks/auth/useAuth";
import { authStore } from "@/store/authStore";
import { useEffect } from "react";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
    const {isLogged, logout} = authStore(state => state);
    const { mutateAsync: refresh, isIdle } = useRefresh();

    useEffect(() => {
        if (!isLogged && isIdle) {
            const initializeAuth = async () => {
                try {
                    await refresh();
                } catch {
                    logout();
                }
            };
            initializeAuth();
        }
    }, [isIdle, isLogged, refresh, logout]);

    return <>{children}</>;
}