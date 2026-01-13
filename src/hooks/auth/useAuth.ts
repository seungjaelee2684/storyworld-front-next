import { authService } from "@/services/authService";
import { authStore } from "@/store/authStore";
import { KakaoLoginType, SignupType } from "@/types/authType";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

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

export function useKakaoLogin() {
    return useMutation({
        mutationFn: async ({body}: {body: KakaoLoginType}) => {
            return await authService.kakaoLogin({body});
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

export function useSignup() {
    return useMutation({
        mutationFn: async (body: SignupType) => {
            return await authService.signup(body);
        },
        onSuccess: () => {
            toast.success("회원가입이 완료되었습니다.")
        }
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

export function useDuplicateCheck() {
    return useMutation({
        mutationFn: async ({username, nickname, email}: {username?: string, nickname?: string, email?: string}) => {
            return await authService.duplicateCheck({username, nickname, email});
        }
    })
}