'use client';

import { useKakaoLogin } from "@/hooks/auth/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const REDIRECT_URI =
    process.env.NODE_ENV === 'development'
        ? "http://localhost:3000/auth/login/kakao"
        : `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/auth/login/kakao`;

export default function KakaoLoginPage() {

    const router = useRouter();
    const { mutateAsync: kakaoLogin } = useKakaoLogin();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (!code) return;

        const loginFn = async () => {
            try {
                await kakaoLogin({ body: { code, redirect_uri: REDIRECT_URI } });
                router.push("/");
            } catch (error) {
                console.error(error);
            }
        };

        loginFn();
    }, [kakaoLogin, router]);

    return (
        <article className="w-full flex flex-col justify-center items-center gap-6 sm:px-0 px-4">
            <div className="w-16 h-16 rounded-full animate-spin border-t-2 border-r-2 border-kakao" />
            <p className="text-lg font-bold">카카오 로그인 중...</p>
        </article>
    );
}