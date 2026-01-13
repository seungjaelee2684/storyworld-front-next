import Image from "next/image";
import Link from "next/link";

export default function KakaoLoginBtn() {

    const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY || "";
    const CLIENT_URL = process.env.NODE_ENV === 'development' 
        ? "http://localhost:3000" 
        : (process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000");
    const REDIRECT_URI = `${CLIENT_URL}/auth/login/kakao`;
    const KAKAO_AUTHORIZE_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    return (
        <Link href={KAKAO_AUTHORIZE_URL}>
            <button type="button" className="w-full h-10 flex justify-between items-center gap-4 rounded-md bg-[#FEE500] cursor-pointer px-4 hover:bg-[#E5CE00] transition-colors">
                <Image src="/images/kakao_icon.svg" alt="kakao" width={20} height={20} className="w-6 h-6" />
                <span className="text-[#000000D9] font-medium text-sm">카카오로 시작하기</span>
                <div className="w-6" />
            </button>
        </Link>
    )
}