"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface WhatsThisContextType {
  isWhatsThisOpen: boolean;
  setWhatsThisOpen: (value: boolean) => void;
}

const WhatsThisContext = createContext<WhatsThisContextType | undefined>(
  undefined
);

export const WhatsThisProvider = ({ children }: { children: ReactNode }) => {
  const [isWhatsThisOpen, setWhatsThisOpen] = useState<boolean>(false);

  return (
    <WhatsThisContext.Provider value={{ isWhatsThisOpen, setWhatsThisOpen }}>
      {children}
    </WhatsThisContext.Provider>
  );
};

export const useWhatsThisContext = () => {
  const context = useContext(WhatsThisContext);
  if (!context) {
    throw new Error(
      "useWhatsThisContext must be used within a WhatsThisContextProvider"
    );
  }
  return context;
};
