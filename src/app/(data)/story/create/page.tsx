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

type FormDataType = {
    title: string,
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
    description: z.string().min(1, { message: "내용을 입력해주세요." }),
    genres: z.array(z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
    })).min(1, { message: "장르를 선택해주세요." }).max(3, { message: "최대 3개의 장르를 선택할 수 있습니다." }),
    thumbnail: z.string().optional(),
})

function StoryCreateForm() {

    const { mutateAsync } = useStoriesMutation();

    const form = useForm<FormDataType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            genres: [],
        }
    })
    

    const handleSubmit = async (data: FormDataType) => {
        console.log(data);
        const { genres, ...rest } = data;
        const body = {
            ...rest,
            genre_ids: genres.map((genre) => genre.id),
        }
        await mutateAsync({ body });
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full flex flex-col gap-10">
                <FormInputLine title="Title" description="Input Title Here" index={1}>
                    <TextField
                        control={form.control}
                        name="title"
                        placeholder="제목을 입력해주세요."
                        label="제목"
                        isRequired
                        fullWidth />
                </FormInputLine>
                <FormInputLine title="Description" description="Input Description Here" index={2}>
                    <TextareaField
                        control={form.control}
                        name="description"
                        placeholder="줄거리를 입력해주세요."
                        label="줄거리"
                        className="h-32"
                        isRequired />
                </FormInputLine>
                <GenreContainer<FormDataType>/>
                <Separator />
                <Button type="submit" className="mt-[-20px]">
                    스토리 생성
                </Button>
            </form>
        </FormProvider>
    )
}

export default function StoryCreate() {
    return (
        <article className="w-full flex flex-col gap-10 pt-4">
            <div className="flex flex-col">
                <h1 className="text-lg font-bold leading-normal">
                    스토리 생성
                </h1>
                <p className="text-sm leading-normal text-foreground/70">
                    나만의 스토리를 생성해보세요.
                </p>
            </div>
            <StoryCreateForm />
        </article>
    )
}