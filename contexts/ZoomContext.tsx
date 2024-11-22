"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ZoomContextType {
  zoom: number;
  setZoom: (value: number) => void;
}

const ZoomContext = createContext<ZoomContextType | undefined>(undefined);

export const ZoomProvider = ({ children }: { children: ReactNode }) => {
  const [zoom, setZoom] = useState<number>(1);

  return (
    <ZoomContext.Provider value={{ zoom, setZoom }}>
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
