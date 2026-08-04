"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { register } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./SignUpPage.module.css";

type RegisterFormValues = {
  email: string;
  password: string;
};

export default function SignUpPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setError("");

    const values: RegisterFormValues = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };

    try {
      const user = await register(values);
      setUser(user);
      router.push("/profile");
    } catch (err) {
      if (isAxiosError(err)) {
        setError(
          err.response?.data?.error ??
            err.response?.data?.message ??
            err.message ??
            "Registration failed",
        );
      } else {
        setError("Registration failed");
      }
    }
  }

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}
