import { instance } from "@/lib/axios"

export const storiesService = {
    findAll: async ({page}: {page: number}) => {
        const {data} = await instance.get("/api/stories", {
            params: {
                page: 1,
            }
        });
        return data;
    }
}