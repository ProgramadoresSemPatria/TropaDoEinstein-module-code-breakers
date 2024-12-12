"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../schemas/loginSchema";
import { Box, Button, Container, Stack } from "@mui/material";
import SignIn from "@/firebase/auth/signIn";
import { useRouter } from "next/navigation";
import CustomTextField from "@/components/CustomTextField";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  async function onSubmit(data: LoginFormData) {
    const { email, password } = data;

    const { result: userCredential, error } = await SignIn(email, password);

    setErrorMessage("");
    if (error) {
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === "auth/invalid-credential"
      ) {
        setErrorMessage("Email e/ou senha inválidos.");
      } else if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === "auth/too-many-requests"
      ) {
        setErrorMessage("Muitas tentativas, tente mais tarde.");
      } else {
        setErrorMessage("Erro ao fazer login.");
      }
    } else if (userCredential?.user.uid) {
      return router.push("/");
    }
  }

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center">
      <Container maxWidth="sm">
        <Box
          sx={{
            padding: 4,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "var(--customPurple)",
            color: "white",
          }}
        >
          <h1 className="text-center pb-8 text-2xl">Hello! Welcome back.</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={3}>

              <CustomTextField
                type="email"
                label="Email"
                name="email"
                register={register("email")} 
                error={!!errors.email} 
                helperText={errors.email?.message} 
              />
              <CustomTextField
                type="password"
                label="Password"
                name="password"
                register={register("password")} 
                error={!!errors.password} 
                helperText={errors.password?.message} 
              />
              
              <p className="p-2 text-red-500">{errorMessage}</p>
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

              <p className="text-center">
                Do not have an account?{" "}
                <a className="text-blue-500" href="/register">
                  Click here
                </a>{" "}
                to sign up.
              </p>
            </Stack>
          </form>
        </Box>
      </Container>
    </main>
  );
}
