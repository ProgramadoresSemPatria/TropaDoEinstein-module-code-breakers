"use client";
import React, { ReactNode } from "react";
import { TreemapProvider } from "./TreemapContext";
import { NumberOfProblemsTableContextProvider } from "./NumberOfProblemsTableContext";
import { IsModalOpenContextProvider } from "./IsModalOpenContext";
import { SettingsProvider } from "./SettingsContext";

export const ProviderWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <TreemapProvider>
      <NumberOfProblemsTableContextProvider>
        <IsModalOpenContextProvider>
          <SettingsProvider>{children}</SettingsProvider>
        </IsModalOpenContextProvider>
      </NumberOfProblemsTableContextProvider>
    </TreemapProvider>
  );
};
