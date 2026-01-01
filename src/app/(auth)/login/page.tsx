'use client';

import { DynamicTextField } from "@/components/DynamicTextField";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/auth/useAuth";
import { authStore } from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";

interface LoginFormType {
    username: string;
    password: string;
}

const loginSchema = z.object({
    username: z.string()
        .min(4, {message: "아이디는 최소 4자 이상 입력해주세요."})
        .max(20, {message: "아이디는 최대 20자 이하로 입력해주세요."})
        .regex(/^[a-zA-Z0-9]+$/, {message: "아이디는 영문자와 숫자만 입력해주세요."}),
    password: z.string()
        .min(8, {message: "비밀번호는 최소 8자 이상 입력해주세요."})
        .max(20, {message: "비밀번호는 최대 20자 이하로 입력해주세요."})
        .regex(/^[a-zA-Z0-9!@#$%^&*,.]+$/, {message: "비밀번호는 영문자, 숫자, 특수문자만 입력해주세요."}),
})

export default function Login() {

    const router = useRouter();
    const isLogged = authStore(state => state.isLogged);
    const {mutateAsync} = useLogin();

    const form = useForm<LoginFormType>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginFormType) => {
        const result = await mutateAsync(data);
        if (result) {
            router.push("/");
        }
    }

    useEffect(() => {
        if (isLogged) {
            router.push("/");
        }
    }, [isLogged, router])

    return (
        <article className="w-full h-full flex flex-col justify-center items-center gap-10 pt-4 pb-10">
            <h1 className="text-2xl font-bold">로그인</h1>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="sm:w-2/5 w-full flex flex-col gap-4">
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
                    <Button type="submit">
                        로그인
                    </Button>
                </form>
            </FormProvider>
        </article>
    )
}

