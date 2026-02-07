import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface TextFieldProps<T extends FieldValues = FieldValues> {
    control: Control<T>;
    name: string;
    label?: string;
    placeholder?: string;
    successMessage?: string | null;
    type?: string;
    unit?: string;
    isPassword?: boolean;
    fullWidth?: boolean;
    isRequired?: boolean;
    button?: React.ReactNode;
    className?: string;
}

export function TextField<T extends FieldValues = FieldValues>({
    control,
    name,
    label,
    placeholder = "",
    successMessage,
    type = "text",
    unit,
    isPassword = false,
    fullWidth = false,
    isRequired = false,
    button,
    className
}: TextFieldProps<T>) {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
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
                    <div className="w-full flex items-center gap-2">
                        <FormControl>
                            <div className={cn(
                                fullWidth ? "w-full" : "w-full sm:w-100",
                                successMessage ? "border-green-400" : "border-input",
                                "flex justify-between items-center gap-2 p-2 rounded-sm border-1 border-input h-9 focus-within:border-primary transition-all"
                            )}>
                                <Input
                                    {...field}
                                    id={field.name}
                                    className={cn(
                                        className,
                                        "w-full border-none px-0 py-0 h-full rounded-none focus-visible:border-none"
                                    )}
                                    type={isPassword ? (passwordVisible ? "text" : "password") : type}
                                    placeholder={placeholder} />
                                {isPassword
                                    && (passwordVisible
                                        ? <EyeOffIcon className="w-4 h-4 cursor-pointer text-muted-foreground" onClick={() => setPasswordVisible(!passwordVisible)} />
                                        : <EyeIcon className="w-4 h-4 cursor-pointer text-muted-foreground" onClick={() => setPasswordVisible(!passwordVisible)} />)}
                            </div>
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