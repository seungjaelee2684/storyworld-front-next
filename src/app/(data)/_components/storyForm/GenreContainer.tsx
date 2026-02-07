import { FieldValues, Path, useFormContext } from "react-hook-form";
import { FormInputLine } from "../FormInputLine";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useGenres } from "@/hooks/genres/useGenres";
import { cn } from "@/lib/utils";
import { GenreType } from "@/types/genreType";
import { Pin } from "lucide-react";
import { Field, FieldContent, FieldLabel, FieldTitle } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";

const GenreContainer = <T extends FieldValues = FieldValues>() => {

    const { data: genres, isLoading } = useGenres();

    const form = useFormContext<T>();
    const formGenres = form.watch("genres" as Path<T>);

    const genreSkeleton = new Array(30).fill(0).map((_, index) => {return <Skeleton key={index} className="w-full h-12.5 rounded-sm" />});

    return (
        <FormInputLine title="Genre" description="Select Genre Here" index={3}>
            <FormField
                control={form.control}
                name={"genres" as Path<T>}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>장르<span className="text-red-500 leading-none">*</span></FormLabel>
                        {isLoading && (
                            <div className="w-full grid sm:grid-cols-4 grid-cols-2 gap-2">
                                {genreSkeleton}
                            </div>
                        )}
                        {formGenres && formGenres.length > 0 && !isLoading
                            && <div className="w-full flex items-center gap-1 py-2 flex-wrap border-b-1">
                                {formGenres.map((genre: GenreType, index: number) => {
                                    return (
                                        <div
                                            key={genre.id}
                                            className={cn(
                                                index === 0 && "bg-primary/10 text-primary border-primary/80",
                                                "px-2 py-1.5 rounded-sm border-1 text-xs flex items-center gap-1 relative",
                                                "group"
                                            )}>
                                            {index === 0
                                                && <span className={cn(
                                                    "text-[10px] text-white bg-primary px-1 py-0.5 rounded-[4px]"
                                                )}>
                                                    메인
                                                </span>}
                                            {index !== 0
                                                && <Pin
                                                    fill="currentColor"
                                                    className={cn(
                                                        "size-3.5 cursor-pointer text-muted-foreground",
                                                        "hidden group-hover:block transition-all hover:text-primary",
                                                        "absolute z-1 top-0 -translate-y-1/3 right-0 translate-x-1/3"
                                                    )}
                                                    onClick={() => {
                                                        const filteredGenres = formGenres.filter((g: GenreType) => g.id !== genre.id);
                                                        field.onChange([genre, ...filteredGenres]);
                                                    }} />}
                                            <span>{genre.name}</span>
                                        </div>
                                    )
                                })}

                            </div>}
                        <div className="w-full grid sm:grid-cols-4 grid-cols-2 gap-2">
                            {genres && genres.length > 0
                                && genres.map((genre) => {

                                    const isInGenreIds = field.value.some((g: GenreType) => g.id === genre.id);
                                    const isChecked = isInGenreIds;

                                    return (
                                        <FormControl key={genre.id}>
                                            <FieldLabel>
                                                <Field orientation="horizontal" className="cursor-pointer hover:opacity-70 transition-all">
                                                    <Checkbox
                                                        id={`genre-${genre.id}`}
                                                        checked={isChecked}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) {
                                                                field.onChange([...field.value, genre]);
                                                            } else {
                                                                field.onChange(field.value.filter((g: GenreType) => g.id !== genre.id));
                                                            }
                                                        }}
                                                    />
                                                    <FieldContent>
                                                        <FieldTitle className="text-xs">{genre.name}</FieldTitle>
                                                    </FieldContent>
                                                </Field>
                                            </FieldLabel>
                                        </FormControl>
                                    )
                                })}
                        </div>
                    </FormItem>
                )} />
        </FormInputLine>
    )
}

export default GenreContainer;