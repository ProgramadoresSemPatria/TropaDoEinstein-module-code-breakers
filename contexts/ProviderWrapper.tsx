"use client";
import React, { ReactNode } from "react";
import { ZoomProvider } from "./ZoomContext";
import { NumberOfProblemsTableContextProvider } from "./NumberOfProblemsTableContext";

export const ProviderWrapper = ({ children }: { children: ReactNode }) => {
  return (
      <ZoomProvider>
        <NumberOfProblemsTableContextProvider>
            {children}
        </NumberOfProblemsTableContextProvider>
      </ZoomProvider>
  );
};
