"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { EmailInput } from "~/shared/ui/EmailInput";
import { PasswordInput } from "~/shared/ui/PasswordInput";
import { RegistrButton } from "~/shared/ui/registrButton";
import { TextInput } from "~/shared/ui/TextInput";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Тип для ответа от API регистрации
interface RegisterResponse {
  message?: string;
  user?: {
    id: string;
    email: string;
    username: string;
  };
  error?: string;
}

export const RegisterForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    watch,
  } = useForm<RegisterFormData>();

  const password = watch("password");

  const onRegisterSubmit = async (data: RegisterFormData) => {
    setIsLoading(true); 
    setErrorMessage(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      let result: RegisterResponse;
      try {
        result = await res.json() as RegisterResponse;
      } catch {
        const text = await res.text();
        result = { message: text };
      }

      if (!res.ok) {
        throw new Error(result.message ?? result.error ?? "Ошибка регистрации");
      }

      const signInRes = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (signInRes?.error) {
        throw new Error("Ошибка входа после регистрации");
      }

      router.push("/profile");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Неизвестная ошибка при регистрации");
      }
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <form
      onSubmit={handleRegisterSubmit(onRegisterSubmit)}
      className="flex flex-col justify-center gap-4 px-6"
    >
      <p className="text-grey flex justify-center">
        Создайте аккаунт за пару секунд
      </p>

      {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}

      <TextInput
        label="Имя"
        placeholder="Введите имя"
        {...registerRegister("name", {
          required: "Имя обязательно",
          minLength: {
            value: 2,
            message: "Имя должно содержать минимум 2 символа",
          },
        })}
        error={registerErrors.name?.message}
        disabled={isLoading} 
      />

      <EmailInput
        {...registerRegister("email", {
          required: "Email обязателен",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Неверный формат email",
          },
        })}
        error={registerErrors.email?.message}
        disabled={isLoading}
      />

      <PasswordInput
        label="Пароль"
        placeholder="Минимум 6 символов"
        register={registerRegister("password", {
          required: "Пароль обязателен",
          minLength: {
            value: 6,
            message: "Пароль должен содержать минимум 6 символов",
          },
        })}
        error={registerErrors.password?.message}
        disabled={isLoading} 
      />

      <PasswordInput
        label="Подтвердите пароль"
        placeholder="Повторите пароль"
        {...registerRegister("confirmPassword", {
          required: "Подтверждение пароля обязательно",
          validate: (value) => value === password || "Пароли не совпадают",
        })}
        error={registerErrors.confirmPassword?.message}
        disabled={isLoading} 
      />

      <div className="pt-3">
        <RegistrButton 
          textButton="Регистрация..."
          text={isLoading ? "Создание аккаунта..." : "Создать аккаунт"} 
          isLoading={isLoading} 
          disabled={isLoading} 
        />
      </div>
    </form>
  );
};