import { GenreService } from "@/services/genreService";
import { useQuery } from "@tanstack/react-query";

export function useGenres() {
    return useQuery({
        queryKey: ["genres"],
        queryFn: async () => {
            return await GenreService.findAll();
        }
    })
}