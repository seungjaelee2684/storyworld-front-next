'use client';

import KakaoLoginBtn from "@/components/auth/KakaoLoginBtn";
import { DynamicTextField } from "@/components/DynamicTextField";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/auth/useAuth";
import { authStore } from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface LoginFormType {
    username: string;
    password: string;
}

const loginSchema = z.object({
    username: z.string()
        .min(4, { message: "아이디는 최소 4자 이상 입력해주세요." })
        .max(20, { message: "아이디는 최대 20자 이하로 입력해주세요." }),
    password: z.string()
        .min(8, { message: "비밀번호는 최소 8자 이상 입력해주세요." })
        .max(20, { message: "비밀번호는 최대 20자 이하로 입력해주세요." })
})

export default function Login() {

    const router = useRouter();
    const isLogged = authStore(state => state.isLogged);
    const { mutateAsync, isPending } = useLogin();

    const form = useForm<LoginFormType>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginFormType) => {
        try {
            await mutateAsync(data);
            router.push("/");
        } catch (error) {
            toast.error("아이디 또는 비밀번로가 일치하지 않습니다.");
            return;
        }
    }

    useEffect(() => {
        if (isLogged) {
            router.push("/");
        }
    }, [isLogged, router])

    if (isLogged) return null;

    return (
        <article className="w-full flex flex-col justify-center items-center gap-10 sm:px-0 px-4">
            <h1 className="text-2xl font-bold">로그인</h1>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="sm:w-3/7 w-full flex flex-col gap-4">
                    <DynamicTextField
                        control={form.control}
                        name="username"
                        label={"아이디"}
                    />
                    <DynamicTextField
                        control={form.control}
                        name="password"
                        label={"비밀번호"}
                        type="password"
                    />
                    <Button type="submit" disabled={isPending}>
                        {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isPending ? "로그인 중..." : "로그인"}
                    </Button>
                    <div className="w-full flex justify-between items-center text-sm text-gray-500 pb-10">
                        <Link href="/forgot-password" className="hover:text-primary/80 transition-colors">비밀번호 찾기</Link>
                        <Link href="/auth/signup" className="hover:text-primary/80 transition-colors">회원가입</Link>
                    </div>
                    <KakaoLoginBtn />
                </form>
            </FormProvider>
        </article>
    )
}

