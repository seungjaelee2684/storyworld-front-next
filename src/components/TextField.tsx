import { Control, FieldValues } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

interface TextFieldProps {
    control: Control<FieldValues>;
    name: string;
    label: string;
}

export function TextField({
    control,
    name,
    label,
}: TextFieldProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem
                    className="w-full"
                >
                    <FormLabel
                        htmlFor={field.name}
                    >
                        {label}
                    </FormLabel>
                        <FormControl className="w-full flex justify-between items-center gap-2 p-2 rounded-sm focus-within:ring-1 focus-within:ring-primary">
                            <Input {...field} id={field.name} className="w-full focus:outline-none focus:ring-0 focus-visible:ring-0 border-none" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
    );
}