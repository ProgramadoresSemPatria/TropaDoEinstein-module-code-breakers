"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SettingsContextType {
  isSettingsOpen: boolean;
  setIsSettingsOpen: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  return (
    <SettingsContext.Provider value={{ isSettingsOpen, setIsSettingsOpen }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      "useSettingsContext must be used within a SettingsContextProvider"
    );
  }
  return context;
};
