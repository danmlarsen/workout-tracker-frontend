import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useSearchParamState(paramName: string) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const value = searchParams.get(paramName) === "open";

  const setValue = (open: boolean) => {
    const params = new URLSearchParams(searchParams);
    if (open) {
      params.set(paramName, "open");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    } else {
      params.delete(paramName);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  return [value, setValue] as const;
}
