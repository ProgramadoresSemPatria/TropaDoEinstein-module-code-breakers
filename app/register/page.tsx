"use client"; // Use this for the App Router

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import { registerSchema, RegisterFormData } from "../schemas/registerSchema";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("Registration Data:", data);
    // Add your registration logic here
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 8 }}>
      <Box
        sx={{
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "var(--customPurple)",
          color: "white",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          mb={3}
          sx={{ color: "var(--greenLogo)" }}
        >
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={3}>
            {/* Name Field */}
            <TextField
              label="Name"
              variant="outlined"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
              sx={{ "& .MuiInputBase-root": { color: "white" } }}
              InputLabelProps={{
                style: { color: "white" },
              }}
            />

            {/* Email Field */}
            <TextField
              label="Email"
              variant="outlined"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              sx={{ "& .MuiInputBase-root": { color: "white" } }}
              InputLabelProps={{
                style: { color: "white" },
              }}
            />

            {/* Password Field */}
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              sx={{ "& .MuiInputBase-root": { color: "white" } }}
              InputLabelProps={{
                style: { color: "white" },
              }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                backgroundColor: "var(--customPurpleBtn)",
                "&:hover": { backgroundColor: "var(--purpleLogo)" },
              }}
            >
              Register
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
