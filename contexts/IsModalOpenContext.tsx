"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface IsModalOpenContextType {
  isPrincipalModalSectionOpen: boolean;
  setIsPrincipalModalSectionOpen: (value: boolean) => void;
}

const IsModalOpenContext = createContext<IsModalOpenContextType | undefined>(undefined);

export const IsModalOpenContextProvider = ({ children }: { children: ReactNode }) => {
  const [isPrincipalModalSectionOpen, setIsPrincipalModalSectionOpen] = useState<boolean>(false);

  return (
    <IsModalOpenContext.Provider value={{ isPrincipalModalSectionOpen, setIsPrincipalModalSectionOpen }}>
      {children}
    </IsModalOpenContext.Provider>
  );
};

export const useIsModalOpenContext = () => {
  const context = useContext(IsModalOpenContext);
  if (!context) {
    throw new Error("useIsModalOpenContext must be used within a IsModalOpenContextProvider");
  }
  return context;
};
