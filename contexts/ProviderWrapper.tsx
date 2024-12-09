"use client";
import React, { ReactNode } from "react";
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
    
import { SettingsProvider } from "./SettingsContext";
import { AuthContextProvider } from "./AuthContext/AuthProvider";
import { UserInfoContextProvider } from "./UserInfoContext";


export const ProviderWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContextProvider>
        <UserInfoContextProvider>
            <NumberOfProblemsTableContextProvider>
              <IsModalOpenContextProvider>
                <SettingsProvider>{children}</SettingsProvider>
              </IsModalOpenContextProvider>
            </NumberOfProblemsTableContextProvider>
        </UserInfoContextProvider>
    </AuthContextProvider>
  );
};
