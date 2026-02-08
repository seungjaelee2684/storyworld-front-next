'use client';

import { TextareaField } from "@/components/TextareaField";
import { TextField } from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useStoriesMutation } from "@/hooks/stories/useStoriesMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { FormInputLine } from "../../_components/FormInputLine";
import GenreContainer from "../../_components/storyForm/GenreContainer";
import { Loader, Save } from "lucide-react";
import { useRouter } from "next/navigation";

type FormDataType = {
    title: string,
    sub_title?: string,
    description: string,
    genres: {
        id: number,
        name: string,
        description: string,
    }[],
    thumbnail?: string
}

const formSchema = z.object({
    title: z.string().min(1, { message: "제목을 입력해주세요." }),
    sub_title: z.string().optional(),
    description: z.string().min(1, { message: "내용을 입력해주세요." }),
    genres: z.array(z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
    })).min(1, { message: "장르를 선택해주세요." }).max(3, { message: "최대 3개의 장르를 선택할 수 있습니다." }),
    thumbnail: z.string().optional(),
})

function StoryCreateForm() {

    const router = useRouter();
    const { mutateAsync, isPending } = useStoriesMutation();

    const form = useForm<FormDataType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            sub_title: undefined,
            description: "",
            genres: [],
        }
    })

    const handleSubmit = async (data: FormDataType) => {
        const { genres, ...rest } = data;
        const body = {
            ...rest,
            genre_ids: genres.map((genre) => genre.id),
        }
        try {
            const result = await mutateAsync({body});
            if (!result) throw new Error("스토리 생성에 실패했습니다.");
            router.push("/story/list");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full flex flex-col sm:gap-10 gap-6">
                <FormInputLine title="Title" description="Input Title Here" index={1}>
                    <TextField
                        control={form.control}
                        name="title"
                        placeholder="제목을 입력해주세요."
                        label="제목"
                        isRequired
                        fullWidth />
                </FormInputLine>
                <FormInputLine title="Sub Title" description="Input Sub Title Here" index={2}>
                    <TextField
                        control={form.control}
                        name="sub_title"
                        placeholder="부제목을 입력해주세요."
                        label="부제목"
                        isChoice
                        fullWidth />
                </FormInputLine>
                <FormInputLine title="Description" description="Input Description Here" index={3}>
                    <TextareaField
                        control={form.control}
                        name="description"
                        placeholder="줄거리를 입력해주세요."
                        label="줄거리"
                        className="h-32"
                        isRequired />
                </FormInputLine>
                <GenreContainer<FormDataType> />
                <Separator />
                <Button type="submit" className="sm:mt-[-20px] sm:w-fit w-full ml-auto">
                    {isPending ? <Loader className="size-4 animate-spin" /> : <Save className="size-4" />}
                    {isPending ? "저장 중..." : "저장"}
                </Button>
            </form>
        </FormProvider>
    )
}

export default function StoryCreate() {
    return (
        <article className="w-full flex flex-col gap-6 pt-4">
            <div className="flex flex-col">
                <h1 className="text-lg font-bold leading-normal">
                    스토리 생성
                </h1>
                <p className="text-sm leading-normal text-foreground/70">
                    나만의 스토리를 생성해보세요.
                </p>
            </div>
            <Separator />
            <StoryCreateForm />
        </article>
    )
}