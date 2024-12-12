"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface IsModalOpenContextType {
  isPrincipalModalSectionOpen: { value: boolean; id: number }; 
  setIsPrincipalModalSectionOpen: (value: { value: boolean; id: number }) => void; 
  principalModalTitle: string;
  setPrincipalModalTitle: ( value: string ) => void;
}

const IsModalOpenContext = createContext<IsModalOpenContextType | undefined>(undefined);

export const IsModalOpenContextProvider = ({ children }: { children: ReactNode }) => {
  const [isPrincipalModalSectionOpen, setIsPrincipalModalSectionOpen] = useState<{ value: boolean; id: number }>({
    value: false,
    id: 0,
  });

  const [principalModalTitle, setPrincipalModalTitle] = useState<string>('');
  

  return (
    <IsModalOpenContext.Provider value={{ 
      isPrincipalModalSectionOpen, setIsPrincipalModalSectionOpen, principalModalTitle, setPrincipalModalTitle
      }}>
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
