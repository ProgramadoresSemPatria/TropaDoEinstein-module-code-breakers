"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface TreemapContextType {
  enableResetzoom: boolean;
  setEnableResetzoom: (value: boolean) => void;
  enableDragging: boolean;
  setEnableDragging: (value: boolean) => void;
}

const TreemapContext = createContext<TreemapContextType | undefined>(undefined);

export const TreemapProvider = ({ children }: { children: ReactNode }) => {
  const [enableResetzoom, setEnableResetzoom] = useState<boolean>(false);
  const [enableDragging, setEnableDragging] = useState<boolean>(true);

  return (
    <TreemapContext.Provider
      value={{
        enableResetzoom,
        setEnableResetzoom,
        enableDragging,
        setEnableDragging,
      }}
    >
      {children}
    </TreemapContext.Provider>
  );
};

export const useTreemapContext = () => {
  const context = useContext(TreemapContext);
  if (!context) {
    throw new Error("useTreemapContext must be used within a TreemapProvider");
  }
  return context;
};
