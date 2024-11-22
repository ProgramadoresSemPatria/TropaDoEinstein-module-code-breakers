"use client";
import React, { ReactNode } from "react";
import { ZoomProvider } from "./ZoomContext";

export const ProviderWrapper = ({ children }: { children: ReactNode }) => {
  return <ZoomProvider>{children}</ZoomProvider>;
};
