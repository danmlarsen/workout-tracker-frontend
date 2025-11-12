"use client";

import { createContext, useContext } from "react";

import { useSearchParamState } from "@/hooks/use-search-param-state";

export interface ActiveWorkoutContextValue {
  activeWorkoutOpen: boolean;
  setActiveWorkoutOpen: (open: boolean) => void;
}

const ActiveWorkoutContext = createContext<ActiveWorkoutContextValue | null>(
  null,
);

interface ActiveWorkoutProviderProps {
  children: React.ReactNode;
}

export const ActiveWorkoutProvider = ({
  children,
}: ActiveWorkoutProviderProps) => {
  const [activeWorkoutOpen, setActiveWorkoutOpen] = useSearchParamState(
    "active-workout-modal",
  );

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
