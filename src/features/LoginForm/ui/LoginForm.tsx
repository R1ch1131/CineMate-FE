"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { EmailInput } from "~/shared/ui/EmailInput";
import { PasswordInput } from "~/shared/ui/PasswordInput";
import { RegistrButton } from "~/shared/ui/registrButton";
import { CONSTANTS } from "~/shared/lib/strings";

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onLoginSubmit = async (data: LoginFormData) => {
    setErrorMessage(null);

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      setErrorMessage("Неверный email или пароль");
    } else {
      router.push("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onLoginSubmit)}
      className="flex flex-col justify-center gap-4 px-6"
    >
      <p className="text-grey flex justify-center">
        {CONSTANTS.auth.label.enterLogin}
      </p>

      {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}

      <EmailInput
        {...register("email", {
          required: "Email обязателен",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Неверный формат email",
          },
        })}
        error={errors.email?.message}
      />

      <PasswordInput
        label="Пароль"
        placeholder="Минимум 6 символов"
        {...register("password", {
          required: "Пароль обязателен",
          minLength: {
            value: 6,
            message: "Пароль должен содержать минимум 6 символов",
          },
        })}
        error={errors.password?.message}
      />

      <div className="pt-3">
        <RegistrButton text="Войти в аккаунт" />
      </div>
    </form>
  );
};
