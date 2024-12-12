"use client"; // Use this for the App Router

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Stack } from "@mui/material";
import { registerSchema, RegisterFormData } from "../schemas/registerSchema";
import SignUp from "@/firebase/auth/signUp";
import { useRouter } from "next/navigation";
import { ref, set } from "firebase/database";
import { database } from "@/firebase/firebaseDBConfig";
import CustomTextField from "@/components/CustomTextField";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  async function onSubmit(data: RegisterFormData) {
    const { name, email, password } = data;
    const { result, error } = await SignUp(email, password);

    setErrorMessage("");
    if (error) {
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === "auth/email-already-in-use"
      ) {
        setErrorMessage("Email already in use.");
      }
    } else {
      if (result && result.user) {
        const userRef = ref(database, "users/" + result.user.uid);
        await set(userRef, {
          name: name,
          email: email,
        });
      }
      return router.push("/login");
    }
  }

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
        <h1 className="text-center pb-8 text-2xl">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={3}>
            
            <CustomTextField
              type="text"
              label="Name"
              name="name"
              register={register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
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
              Register
            </Button>

            <p className="text-center">
              Already have an account?{" "}
              <a className="text-blue-500" href="/login">
                Click here
              </a>{" "}
              to sign in.
            </p>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
