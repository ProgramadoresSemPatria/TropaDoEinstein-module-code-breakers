'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NumberOfProblemsModalTableType { 
    quantityTableData: number; 
    totalStatusChecked: number; 
};

interface NumberOfProblemsTableContextType {
    numberOfProblemsModalTable: NumberOfProblemsModalTableType;
    setNumberOfProblemsModalTable: (value: NumberOfProblemsModalTableType) => void;
};

const NumberOfProblemsTableContext = createContext<NumberOfProblemsTableContextType | undefined>(undefined);

export const NumberOfProblemsTableContextProvider = ({ children }: { children: ReactNode }) => {
    const [numberOfProblemsModalTable, setNumberOfProblemsModalTable] = useState<NumberOfProblemsModalTableType>(
        { quantityTableData: 0, totalStatusChecked: 0 }
    );

    return (
        <NumberOfProblemsTableContext.Provider value={{ 
            numberOfProblemsModalTable, 
            setNumberOfProblemsModalTable 
            }}>
            {children}
        </NumberOfProblemsTableContext.Provider>
    )

}

export const useNumberOfProblemsTableContext = () => {
    const context = useContext(NumberOfProblemsTableContext);
    if(!context) {
        throw new Error("progressBarWidthContext must be used within a ProgressBarWidthProvider");
    }
    return context;
}