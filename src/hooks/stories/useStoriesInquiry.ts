import { storiesService } from "@/services/storiesService";
import { useQuery } from "@tanstack/react-query";

export function useStoriesInquiry({page}: {page?: number}) {
    return useQuery({
        queryKey: ["stories", page],
        queryFn: async () => {
            return await storiesService.findAll({page: page ?? 1});
        }
    })
}