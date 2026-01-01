import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface DynamicTextFieldProps<T extends FieldValues = FieldValues> {
    control: Control<T>;
    name: string;
    label: string;
    description?: string;
    type?: string;
    className?: string;
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    onChange?: (value: string) => void;
}

export function DynamicTextField<T extends FieldValues = FieldValues>({
    control,
    name,
    label,
    description,
    type = "text",
    className,
    leftContent,
    rightContent,
    onChange
}: DynamicTextFieldProps<T>) {
    return (
        <FormField
            control={control}
            name={name as Path<T>}
            render={({field}) => {
                const hasValue = Boolean(field.value);
                return (
                    <FormItem>
                        <FormControl>
                            <div 
                                className={cn(
                                    className,
                                    "relative group",
                                    "w-full h-9 flex items-center gap-2 px-3 py-1 border-1 rounded-md focus-within:border-primary-foreground transition-all"
                                )}
                                data-has-value={hasValue}
                            >
                                {label
                                    && <div className={cn(
                                            "group-focus-within:text-primary-foreground transition-all",
                                            "group-focus-within:top-0 bg-background group-focus-within:text-xs",
                                            "group-data-[has-value=true]:top-0 bg-background group-data-[has-value=true]:text-xs",
                                            "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm"
                                        )}>
                                        {label}
                                    </div>}
                                {leftContent && leftContent}
                                <Input
                                    {...field}
                                    value={field.value ?? ""}
                                    type={type}
                                    className={cn(
                                        "border-none px-0 py-0 h-full rounded-none focus-visible:border-none"
                                    )}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        onChange?.(e.target.value);
                                    }}
                                />
                                {rightContent && rightContent}
                            </div>
                        </FormControl>
                        {description && <FormDescription>{description}</FormDescription>}
                        <FormMessage />
                    </FormItem>
                );
            }} />
    )
}