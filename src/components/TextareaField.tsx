import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";

interface TextareaFieldProps<T extends FieldValues = FieldValues> {
    control: Control<T>;
    name: string;
    label?: string;
    placeholder?: string;
    successMessage?: string | null;
    isRequired?: boolean;
    className?: string;
}

export function TextareaField<T extends FieldValues = FieldValues>({
    control,
    name,
    label,
    placeholder = "",
    successMessage,
    isRequired = false,
    className
}: TextareaFieldProps<T>) {
    return (
        <FormField
            control={control}
            name={name as Path<T>}
            render={({ field }) => (
                <FormItem
                    className="w-full"
                >
                    {label
                        && <FormLabel htmlFor={field.name}>
                            {label}
                            {isRequired && <span className="text-red-500 leading-none">*</span>}
                        </FormLabel>}
                    <FormControl>
                        <Textarea
                            {...field}
                            id={field.name}
                            className={cn(
                                className,
                            )}
                            placeholder={placeholder} />
                    </FormControl>
                    {successMessage && <FormDescription className="text-green-500">{successMessage}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}