import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  bgColor: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, bgColor, onClick, ...props }) => {
  return (
    <Button
      variant="contained"
      sx={{ 
        backgroundColor: bgColor, 
        '&:hover': { 
          backgroundColor: bgColor, 
        } 
      }}
      onClick={onClick} 
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
