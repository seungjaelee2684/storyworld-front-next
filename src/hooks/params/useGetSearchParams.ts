import { useSearchParams } from "next/navigation";

export function useGetSearchParams(key: string) {
  const searchParams = useSearchParams();
  return searchParams.get(key) || "";
}