import { authService } from "@/services/authService";
import { authStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";

export function useMe() {
    const isLogged = authStore(state => state.isLogged);
    return useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            return await authService.me();
        },
        enabled: isLogged,
    })
}