'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';


export default function ProgressBar({ heightProgressBar, progressBarValue }: { heightProgressBar: number, progressBarValue: number }) {
    

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
      height: heightProgressBar,
      borderRadius: 7,
      [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[200],
        ...theme.applyStyles('dark', {
          backgroundColor: theme.palette.grey[800],
        }),
      },
      [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: '#00eea7',
      },
    }));


    return (
        <div>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <BorderLinearProgress variant="determinate" value={progressBarValue} />
            </Stack>
        </div>
    );
}