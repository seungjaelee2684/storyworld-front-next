import { storiesService } from "@/services/storiesService";
import { useQuery } from "@tanstack/react-query";

export function useStoriesInquiry({page}: {page?: number}) {
    return useQuery({
        queryKey: ["stories"],
        queryFn: async () => {
            const {data} = await storiesService.findAll({page: page ?? 1});
            return data;
        }
    })
}