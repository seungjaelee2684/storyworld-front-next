'use client';

import { useRouter, useSearchParams } from "next/navigation";

export function useSetSearchParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (key: string, value?: string) => {
    const currentValue = searchParams.get(key) ?? "";
    const params = new URLSearchParams(currentValue);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  }
}