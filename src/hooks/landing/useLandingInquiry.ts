import { landingService } from "@/services/landingService";
import { useQuery } from "@tanstack/react-query";
import { useGetSearchParams } from "../params/useGetSearchParams";

export function useLandingInquiry() {
    const currentFilter = useGetSearchParams("filter");
    return useQuery({
        queryKey: ["landing", currentFilter],
        queryFn: async () => {
            return await landingService.findAll({filter: currentFilter ?? "popularity"});
        }
    })
}