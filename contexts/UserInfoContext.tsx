"use client";
import { UserDataFromDBArrayType } from "@/utils/Types/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserInfoContextType {
    userDataFromDatabase: UserDataFromDBArrayType;
    setUserDataFromDatabase: (value: UserDataFromDBArrayType) => void;
}

const UserInfoContext = createContext<UserInfoContextType| undefined>(undefined);


export const UserInfoContextProvider = ({ children }: { children: ReactNode }) => {
    const [userDataFromDatabase, setUserDataFromDatabase] = useState<UserDataFromDBArrayType>([]);

  return (
    <UserInfoContext.Provider value={{ userDataFromDatabase, setUserDataFromDatabase }}> 
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfoContext = () => {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error(
      "useUserInfoContext must be used within a UserInfoContextProvider"
    );
  }
  return context;
};
