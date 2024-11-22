"use client";
import React, { ReactNode } from "react";
import { ZoomProvider } from "./ZoomContext";
import { NumberOfProblemsTableContextProvider } from "./NumberOfProblemsTableContext";
import { IsModalOpenContextProvider } from "./IsModalOpenContext";

export const ProviderWrapper = ({ children }: { children: ReactNode }) => {
  return (
      <ZoomProvider>
        <NumberOfProblemsTableContextProvider>
          <IsModalOpenContextProvider>
            {children}
          </IsModalOpenContextProvider>
        </NumberOfProblemsTableContextProvider>
      </ZoomProvider>
  );
};
