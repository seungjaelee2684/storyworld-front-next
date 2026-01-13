import { instance } from "@/lib/axios";
import { KakaoLoginType, SignupType } from "@/types/authType";

export const authService = {
    me: async () => {
        const {data} = await instance.get("/api/auth/me/");
        return data;
    },
    login: async (username: string, password: string) => {
        const base64Credentials = btoa(`${username}:${password}`);
        const {data, status} = await instance.post("/api/auth/login/", {}, {
            headers: {
                "Authorization": `Basic ${base64Credentials}`
            },
        });

        if (status !== 200) {
            throw data.detail;
        }

        return data;
    },
    kakaoLogin: async ({body}: {body: KakaoLoginType}) => {
        const {data} = await instance.post("/api/auth/kakao/login/", body);
        return data;
    },
    signup: async (body: SignupType) => {
        const {data} = await instance.post("/api/auth/signup/", body);
        return data;
    },
    refresh: async () => {
        const {data, status} = await instance.post("/api/auth/refresh/", {});

        if (status !== 200) {
            throw data.detail;
        }
        return data;
    },
    duplicateCheck: async ({username, nickname, email}: {username?: string, nickname?: string, email?: string}) => {
        const {data, status} = await instance.get("/api/auth/duplication-check/", {
            params: {
                username,
                email,
                nickname
            }
        });

        if (status !== 200) {
            throw data.detail;
        }

        return data;
    }
}