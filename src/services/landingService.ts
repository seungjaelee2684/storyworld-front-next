import { instance } from "@/lib/axios"

export const landingService = {
    findAll: async ({filter}: {filter: string}) => {
        const {data} = await instance.get("/api/landing/", {
            params: {
                filter
            }
        });
        return data;
    }
}