import { instance } from "@/lib/axios"
import { StoryCreateType } from "@/types/storyType";

export const storiesService = {
    findAll: async ({page}: {page: number}) => {
        const {data} = await instance.get("/api/stories", {
            params: {
                page,
            }
        });
        return data;
    },
    create: async ({body}: {body: StoryCreateType}) => {
        const {data} = await instance.post("/api/stories/create/", body);
        return data;
    },
}