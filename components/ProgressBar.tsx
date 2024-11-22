'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { useNumberOfProblemsTableContext } from '@/contexts/NumberOfProblemsTableContext';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  borderRadius: 7,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#15bb89',
  },
}));

interface NumberOfProblemsModalTableType { 
    quantityTableData: number; 
    totalStatusChecked: number; 
};

export default function ProgressBar() {
    
    const { numberOfProblemsModalTable }: { numberOfProblemsModalTable: NumberOfProblemsModalTableType } = useNumberOfProblemsTableContext();
    
    const calculateProgress = () => { 
        if (numberOfProblemsModalTable.quantityTableData === 0) { 
            return 0; 
        }
        return (numberOfProblemsModalTable.totalStatusChecked / numberOfProblemsModalTable.quantityTableData) * 100; 
    }; 
    const progressWidthValue = calculateProgress();

    return (
        <div>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <BorderLinearProgress variant="determinate" value={progressWidthValue} />
            </Stack>
        </div>
    );
}