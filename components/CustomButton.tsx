import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({ children, ...props }: {  children: React.ReactNode, }) => {
    return (
        <Button
            variant="contained"
            sx={{ 
                backgroundColor: 'var(--customPurpleBtn)', 
                '&:hover': { 
                    backgroundColor: 'var(--customPurpleBtn)', 
                } 
            }}
            {...props}
        >
            {children}
        </Button>
    );
};


export default CustomButton;
