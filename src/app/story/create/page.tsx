'use client';

import { TextareaField } from "@/components/TextareaField";
import { TextField } from "@/components/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";

type FormDataType = {
    title: string;
    description: string;
    genre: string;
    thumbnail?: string;
}

const formSchema = z.object({
    title: z.string().min(1, { message: "제목을 입력해주세요." }),
    description: z.string().min(1, { message: "내용을 입력해주세요." }),
    genre: z.string().min(1, { message: "장르를 선택해주세요." }),
    thumbnail: z.string().optional(),
})

function StoryCreateForm() {

    const form = useForm<FormDataType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            genre: "",
        }
    })

    const handleSubmit = async (data: FormDataType) => {
        console.log(data);
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full flex flex-col gap-10">
                <div className="w-full flex items-start gap-4">
                    <div className="sm:min-w-80 min-w-24 flex sm:gap-4 gap-2">
                        <div className="sm:min-w-5 min-w-3 sm:h-5 h-3 bg-primary rounded-full text-white flex justify-center items-center sm:text-xs text-[8px] font-bold">
                            1
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="sm:text-base text-sm text-foreground/70 leading-none">
                                Title
                            </span>
                            <p className="sm:text-sm text-[10px] text-primary/70 sm:leading-normal leading-none">
                                Input Title Here
                            </p>
                        </div>
                    </div>
                    <TextField
                        control={form.control}
                        name="title"
                        placeholder="제목을 입력해주세요."
                        label="제목"
                        isRequired
                        fullWidth />
                </div>
                <div className="w-full flex items-start gap-4">
                    <div className="sm:min-w-80 min-w-24 flex sm:gap-4 gap-2">
                        <div className="sm:min-w-5 min-w-3 sm:h-5 h-3 bg-primary rounded-full text-white flex justify-center items-center sm:text-xs text-[8px] font-bold">
                            2
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="sm:text-base text-sm text-foreground/70 leading-none">
                                Description
                            </span>
                            <p className="sm:text-sm text-[10px] text-primary/70 sm:leading-normal leading-none">
                                Input Description Here
                            </p>
                        </div>
                    </div>
                    <TextareaField
                        control={form.control}
                        name="description"
                        placeholder="줄거리를 입력해주세요."
                        label="줄거리"
                        isRequired />
                </div>
                <div className="w-full flex items-start gap-4">
                    <div className="sm:min-w-80 min-w-24 flex sm:gap-4 gap-2">
                        <div className="sm:min-w-5 min-w-3 sm:h-5 h-3 bg-primary rounded-full text-white flex justify-center items-center sm:text-xs text-[8px] font-bold">
                            3
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="sm:text-base text-sm text-foreground/70 leading-none">
                                Genre
                            </span>
                            <p className="sm:text-sm text-[10px] text-primary/70 sm:leading-normal leading-none">
                                Select Genre Here
                            </p>
                        </div>
                    </div>
                    
                </div>
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