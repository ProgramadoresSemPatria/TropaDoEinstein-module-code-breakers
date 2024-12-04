"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../schemas/loginSchema";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Stack,
} from "@mui/material";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Form Submitted:", data);
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
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={3}>
            {/* Email Field */}
            <TextField
              label="Email"
              variant="outlined"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              sx={{
                "& .MuiInputBase-root": { color: "white" },
              }}
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
              sx={{
                "& .MuiInputBase-root": { color: "white" },
              }}
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
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
