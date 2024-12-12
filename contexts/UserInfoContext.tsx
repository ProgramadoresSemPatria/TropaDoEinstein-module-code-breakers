"use client";
import { UserDataFromDBArrayType } from "@/utils/Types/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserInfoContextType {
    userDataFromDatabase: UserDataFromDBArrayType;
    setUserDataFromDatabase: (value: UserDataFromDBArrayType) => void;
    userTotalProblemsStatusChecked: number;
    setUserTotalProblemsStatusChecked: (value: number) => void;
}

const UserInfoContext = createContext<UserInfoContextType| undefined>(undefined);


export const UserInfoContextProvider = ({ children }: { children: ReactNode }) => {
    const [userDataFromDatabase, setUserDataFromDatabase] = useState<UserDataFromDBArrayType>([]);
    const [userTotalProblemsStatusChecked, setUserTotalProblemsStatusChecked] = useState<number>(0);

  return (
    <UserInfoContext.Provider value={{ userDataFromDatabase, setUserDataFromDatabase, userTotalProblemsStatusChecked, setUserTotalProblemsStatusChecked }}> 
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
