import React from 'react';
import { TextField } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';

interface CustomTextFieldProps {
  type: string;
  label: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: ReturnType<UseFormRegister<any>>; 
  error: boolean;
  helperText: string | undefined; 
  fullWidth?: boolean;
  sx?: object;
}

const CustomTextField = ({
  type,
  label,
  register,
  error,
  helperText,
  fullWidth = true,
  sx = {},
}: CustomTextFieldProps) => {
  return (
    <TextField
      type={type}
      label={label}
      variant="outlined"
      {...register} 
      error={error} 
      helperText={helperText}
      fullWidth={fullWidth}
      sx={{
        "& .MuiOutlinedInput-root": {
          color: "white",
          "& fieldset": { borderColor: "var(--purpleLogo)" },
          "&:hover fieldset": { borderColor: "var(--purpleLogo)" },
          "&.Mui-focused fieldset": { borderColor: "var(--purpleLogo)" },
        },
        ...sx,
      }}
      InputLabelProps={{
        style: { color: "white" },
      }}
    />
  );
};

export default CustomTextField;
