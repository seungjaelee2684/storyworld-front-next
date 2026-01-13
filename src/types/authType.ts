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