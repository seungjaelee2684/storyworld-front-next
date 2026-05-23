import { StoryType } from "./storyType";

export interface SignupType {
    username: string;
    password: string;
    nickname: string;
    email: string;
}

export interface KakaoLoginType {
    code: string;
    redirect_uri: string;
}

export interface UserInfoType {
    id: number;
    username: string;
    email: string;
    nickname: string;
    date_joined: string;
    last_login: string;
    saved_stories: StoryType[];
}