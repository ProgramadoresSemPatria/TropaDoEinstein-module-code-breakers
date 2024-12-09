"use client";
import React, { ReactNode } from "react";
import { NumberOfProblemsTableContextProvider } from "./NumberOfProblemsTableContext";
import { IsModalOpenContextProvider } from "./IsModalOpenContext";
import { WhatsThisProvider } from "./WhatsThisContext";
import { AuthContextProvider } from "./AuthContext/AuthProvider";
import { UserInfoContextProvider } from "./UserInfoContext";

    
export const ProviderWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContextProvider>
        <UserInfoContextProvider>
            <NumberOfProblemsTableContextProvider>
              <IsModalOpenContextProvider>
                <WhatsThisProvider>{children}</WhatsThisProvider>
              </IsModalOpenContextProvider>
            </NumberOfProblemsTableContextProvider>
        </UserInfoContextProvider>
    </AuthContextProvider>
  );
};
