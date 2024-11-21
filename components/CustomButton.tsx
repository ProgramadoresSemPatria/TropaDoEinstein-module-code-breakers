import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({ children, bgColor, ...props }: {  children: React.ReactNode, bgColor: string }) => {
    return (
        <Button
            variant="contained"
            sx={{ 
                backgroundColor: bgColor, 
                '&:hover': { 
                    backgroundColor: bgColor, 
                } 
            }}
            {...props}
        >
            {children}
        </Button>
    );
};


export default CustomButton;
