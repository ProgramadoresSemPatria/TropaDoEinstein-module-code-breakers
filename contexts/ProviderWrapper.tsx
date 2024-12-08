"use client";
import React, { ReactNode } from "react";
import { TreemapProvider } from "./TreemapContext";
import { NumberOfProblemsTableContextProvider } from "./NumberOfProblemsTableContext";
import { IsModalOpenContextProvider } from "./IsModalOpenContext";
import { WhatsThisProvider } from "./WhatsThisContext";

export const ProviderWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <TreemapProvider>
      <NumberOfProblemsTableContextProvider>
        <IsModalOpenContextProvider>
          <WhatsThisProvider>{children}</WhatsThisProvider>
        </IsModalOpenContextProvider>
      </NumberOfProblemsTableContextProvider>
    </TreemapProvider>
  );
};
