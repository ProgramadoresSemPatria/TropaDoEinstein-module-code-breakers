"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ZoomContextType {
  enableResetzoom: boolean;
  setEnableResetzoom: (value: boolean) => void;
}

const ZoomContext = createContext<ZoomContextType | undefined>(undefined);

export const ZoomProvider = ({ children }: { children: ReactNode }) => {
  const [enableResetzoom, setEnableResetzoom] = useState<boolean>(false);

  return (
    <ZoomContext.Provider value={{ enableResetzoom, setEnableResetzoom }}>
      {children}
    </ZoomContext.Provider>
  );
};

export const useZoomContext = () => {
  const context = useContext(ZoomContext);
  if (!context) {
    throw new Error("useZoomContext must be used within a ZoomProvider");
  }
  return context;
};
