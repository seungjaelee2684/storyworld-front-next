import { instance } from "@/lib/axios";

export const authService = {
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
    refresh: async () => {
        const {data, status} = await instance.post("/api/auth/refresh/", {});

        if (status !== 200) {
            throw data.detail;
        }
        return data;
    }
}