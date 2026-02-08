import { GenreType } from "./genreType";

export interface StoryType {
    id?: number;
    user_id?: number;
    nickname?: string;
    title?: string;
    sub_title?: string;
    description?: string;
    genre_of_stories?: GenreType[];
    thumbnail?: string;
    like_count?: number;
    created_at?: string;
    updated_at?: string;
}

export interface StoryCreateType {
    title?: string;
    sub_title?: string;
    description?: string;
    genre_ids?: number[];
    thumbnail?: string;
}