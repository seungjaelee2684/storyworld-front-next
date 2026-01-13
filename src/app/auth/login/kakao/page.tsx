'use client';

import { useKakaoLogin } from "@/hooks/auth/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function KakaoLoginPage() {

    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const CLIENT_URL = process.env.NODE_ENV === 'development'
        ? "http://localhost:3000"
        : (process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000");
    const REDIRECT_URI = `${CLIENT_URL}/auth/login/kakao`;
    const { mutateAsync: kakaoLogin } = useKakaoLogin();

    useEffect(() => {
        setIsMounted(true);
    }, [])

    useEffect(() => {
        if (!isMounted) return;

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        const loginFn = async () => {
            if (code) {
                try {
                    await kakaoLogin({ body: { code, redirect_uri: REDIRECT_URI } });
                    router.push("/");
                }
                catch (error) {
                    console.error(error);
                }
            }
        }

        loginFn();
    }, [isMounted, kakaoLogin, router])

    if (!isMounted) {
        return (
            <article className="w-full flex flex-col justify-center items-center gap-6 sm:px-0 px-4">
                <div className="w-16 h-16 rounded-full animate-spin border-t-2 border-r-2 border-primary" />
                <p className="text-lg font-bold">로딩중...</p>
            </article>
        )
    };

    return (
        <article className="w-full flex flex-col justify-center items-center gap-6 sm:px-0 px-4">
            <div className="w-16 h-16 rounded-full animate-spin border-t-2 border-r-2 border-kakao" />
            <p className="text-lg font-bold">카카오 로그인 중...</p>
        </article>
    )
}