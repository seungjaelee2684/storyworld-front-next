import { useSearchParams } from "next/navigation";

export function useParseSearchParams() {
  const searchParams = useSearchParams();
  
  return (paramName: string, parseValue?: string[]): boolean => {
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      const value = params.get(paramName) ?? "";
      if (parseValue) {
          return parseValue.includes(value);
      } else {
          return value.length > 0;
      }
  }
}