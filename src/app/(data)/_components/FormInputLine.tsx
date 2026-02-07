export function FormInputLine({title, description, index, children}: {title: string, description: string, index: number, children: React.ReactNode}) {
    return (
        <div className="w-full flex items-start gap-4">
            <div className="sm:min-w-60 min-w-24 flex sm:gap-4 gap-2">
                <div className="sm:min-w-5 min-w-3 sm:h-5 h-3 bg-primary rounded-full text-white flex justify-center items-center sm:text-xs text-[8px] font-bold">
                    {index}
                </div>
                <div className="flex flex-col gap-1">
                    <span className="sm:text-base text-sm text-foreground/70 leading-none">
                        {title}
                    </span>
                    <p className="sm:text-sm text-[10px] text-primary/70 sm:leading-normal leading-none">
                        {description}
                    </p>
                </div>
            </div>
            <div className="flex-1 min-w-0">
                {children}
            </div>
        </div>
    )
}