import { storiesService } from "@/services/storiesService";
import { StoryCreateType } from "@/types/storyType";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useStoriesMutation() {
    return useMutation({
        mutationFn: async ({body}: {body: StoryCreateType}) => {
            return await storiesService.create({body});
        },
        onSuccess: () => {
            toast.success("스토리가 생성되었습니다.");
        }
    })
}