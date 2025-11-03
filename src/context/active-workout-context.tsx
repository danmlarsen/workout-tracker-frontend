"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext } from "react";

export interface ActiveWorkoutContextValue {
  activeWorkoutOpen: boolean;
  setActiveWorkoutOpen: (open: boolean) => void;
}

const ActiveWorkoutContext = createContext<ActiveWorkoutContextValue | null>(
  null,
);

export const ActiveWorkoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeWorkoutOpen = searchParams.get("active-workout") === "open";

  const setActiveWorkoutOpen = (open: boolean) => {
    const params = new URLSearchParams(searchParams);
    if (open) {
      params.set("active-workout", "open");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    } else {
      params.delete("active-workout");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <ActiveWorkoutContext.Provider
      value={{ activeWorkoutOpen, setActiveWorkoutOpen }}
    >
      {children}
    </ActiveWorkoutContext.Provider>
  );
};

export const useActiveWorkoutContext = () => {
  const context = useContext(ActiveWorkoutContext);
  if (!context) {
    throw new Error(
      "useActiveWorkoutContext must be used within an ActiveWorkoutProvider",
    );
  }
  return context;
};
