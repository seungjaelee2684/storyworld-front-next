import { instance } from "@/lib/axios"
import { LandingType } from "@/types/landingType";

export const landingService = {
    findAll: async ({filter}: {filter: string}) => {
        const {data} = await instance.get<LandingType>("/api/landing/", {
            params: {
                filter
            }
        });
        return data;
    }
}