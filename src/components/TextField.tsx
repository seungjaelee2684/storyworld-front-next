import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface TextFieldProps<T extends FieldValues = FieldValues> {
    control: Control<T>;
    name: string;
    label: string;
    placeholder?: string;
    successMessage?: string | null;
    type?: string;
    unit?: string;
    button?: React.ReactNode;
}

export function TextField<T extends FieldValues = FieldValues>({
    control,
    name,
    label,
    placeholder,
    successMessage,
    type = "text",
    unit,
    button,
}: TextFieldProps<T>) {
    return (
        <FormField
            control={control}
            name={name as Path<T>}
            render={({ field }) => (
                <FormItem
                    className="w-full"
                >
                    <FormLabel
                        htmlFor={field.name}
                    >
                        {label}
                    </FormLabel>
                    <div className="w-full flex items-center gap-2">
                        <FormControl className={cn(
                            successMessage && "border-green-400",
                            "w-full flex justify-between items-center gap-2 p-2 rounded-sm focus-within:ring-1 focus-within:ring-primary"
                        )}>
                            <Input
                                {...field}
                                id={field.name}
                                className="w-full"
                                type={type}
                                placeholder={placeholder} />
                        </FormControl>
                        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
                        {button && button}
                    </div>
                    {successMessage && <FormDescription className="text-green-500">{successMessage}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}