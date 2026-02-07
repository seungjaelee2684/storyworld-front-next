import { instance } from "@/lib/axios"
import { GenreType } from "@/types/genreType";

export const GenreService = {
    findAll: async () => {
        const {data} = await instance.get<GenreType[]>("/api/genres/");
        return data;
    }
}