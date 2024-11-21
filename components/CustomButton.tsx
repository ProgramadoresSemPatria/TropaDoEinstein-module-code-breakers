import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({ children, className, ...props }: {  children: React.ReactNode, className: string, }) => {
    return (
        <Button
            variant="contained"
            className={className}
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
