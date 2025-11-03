"use client";

import { useSearchParamState } from "@/hooks/use-search-param-state";
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
