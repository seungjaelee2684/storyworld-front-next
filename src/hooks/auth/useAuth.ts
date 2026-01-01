import { authService } from "@/services/authService";
import { authStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
    return useMutation({
        mutationFn: async ({username, password}: {username: string, password: string}) => {
            return await authService.login(username, password);
        },
        onSuccess: (data) => {
            authStore.getState().login(
                data.token,
                data.username,
                data.email,
                data.is_admin,
            );
        },
    })
}

export function useRefresh() {
    return useMutation({
        mutationFn: async () => {
            return await authService.refresh();
        },
        onSuccess: (data) => {
            authStore.getState().login(
                data.token,
                data.username,
                data.email,
                data.is_admin,
            );
        }
    })
}