'use client';

import { TextField } from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { useDuplicateCheck, useSignup } from "@/hooks/auth/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface SignupFormType {
    username: string;
    password: string;
    confirmPassword: string;
    nickname: string;
    email: string;
}

const signupSchema = z.object({
    username: z.string()
        .min(4, { message: "아이디는 최소 4자 이상 입력해주세요." })
        .max(20, { message: "아이디는 최대 20자 이하로 입력해주세요." })
        .regex(/^[a-zA-Z0-9]+$/, { message: "아이디는 영문자와 숫자만 입력해주세요." }),
    password: z.string()
        .min(8, { message: "비밀번호는 최소 8자 이상 입력해주세요." })
        .max(20, { message: "비밀번호는 최대 20자 이하로 입력해주세요." })
        .regex(/^[a-zA-Z0-9!@#$%^&*,.]+$/, { message: "비밀번호는 영문자, 숫자, 특수문자만 입력해주세요." }),
    confirmPassword: z.string()
        .min(8, { message: "비밀번호는 최소 8자 이상 입력해주세요." })
        .max(20, { message: "비밀번호는 최대 20자 이하로 입력해주세요." })
        .regex(/^[a-zA-Z0-9!@#$%^&*,.]+$/, { message: "비밀번호는 영문자, 숫자, 특수문자만 입력해주세요." }),
    nickname: z.string()
        .min(2, { message: "닉네임은 최소 2자 이상 입력해주세요." })
        .max(20, { message: "닉네임은 최대 20자 이하로 입력해주세요." }),
    email: z.string()
        .email({ message: "이메일 형식이 올바르지 않습니다." })
}).refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "비밀번호가 일치하지 않습니다." })

export default function Signup() {

    const router = useRouter();
    const { mutateAsync, isPending } = useSignup();
    const { mutateAsync: mutateDuplicateCheck } = useDuplicateCheck();
    const [duplicateSuccess, setDuplicateSuccess] = useState<{[name: string]: string | null}>({
        username: null,
        nickname: null,
        email: null,
    });

    const form = useForm<SignupFormType>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
            nickname: "",
            email: "",
        },
    })

    const onSubmit = async (data: SignupFormType) => {
        if (Object.values(duplicateSuccess).some(value => value === null)) return toast.error("중복 체크를 모두 진행해주세요.");
        const result = await mutateAsync(data);
        if (result) {
            router.push("/login");
        }
    }

    const onClickDuplicateCheck = async (type: "username" | "nickname" | "email") => {
        const typeString = type === "username" ? "아이디" : type === "nickname" ? "닉네임" : "이메일";
        try {
            await mutateDuplicateCheck({ [type]: form.getValues(type) });
            form.clearErrors(type);
            setDuplicateSuccess((prev) => ({ ...prev, [type]: `사용가능한 ${typeString}입니다.`}))
        } catch (error) {
            setDuplicateSuccess((prev) => ({ ...prev, [type]: null }));
            form.setError(type, {
                type: "manual",
                message: `이미 존재하는 ${typeString}입니다.`,
            });
        }
    }

    return (
        <article className="w-full h-full flex flex-col justify-center items-center gap-10 pt-4 pb-10">
            <h1 className="text-2xl font-bold">회원가입</h1>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="sm:w-3/7 w-full flex flex-col gap-8">
                    <TextField
                        control={form.control}
                        name="username"
                        label={"아이디"}
                        placeholder="아이디를 입력해주세요."
                        successMessage={duplicateSuccess.username}
                        button={
                            <Button type="button" variant="outline" className="text-xs" onClick={() => onClickDuplicateCheck("username")}>
                                <span>중복 확인</span>
                            </Button>
                        }
                    />
                    <TextField
                        control={form.control}
                        name="password"
                        label={"비밀번호"}
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                    />
                    <TextField
                        control={form.control}
                        name="confirmPassword"
                        label={"비밀번호 확인"}
                        type="password"
                        placeholder="비밀번호를 다시 입력해주세요."
                    />
                    <TextField
                        control={form.control}
                        name="nickname"
                        label={"닉네임"}
                        placeholder="닉네임을 입력해주세요."
                        successMessage={duplicateSuccess.nickname}
                        button={
                            <Button type="button" variant="outline" className="text-xs" onClick={() => onClickDuplicateCheck("nickname")}>
                                <span>중복 확인</span>
                            </Button>
                        }
                    />
                    <TextField
                        control={form.control}
                        name="email"
                        label={"이메일"}
                        placeholder="이메일을 입력해주세요."
                        successMessage={duplicateSuccess.email}
                        button={
                            <Button type="button" variant="outline" className="text-xs" onClick={() => onClickDuplicateCheck("email")}>
                                <span>중복 확인</span>
                            </Button>
                        }
                    />
                    <Button type="submit" disabled={isPending}>
                        {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isPending ? "회원가입 중..." : "회원가입"}
                    </Button>
                </form>
            </FormProvider>
        </article>
    )
}