import React from "react";
import { useForm } from "react-hook-form";
import { EmailInput } from "~/shared/ui/EmailInput";
import { PasswordInput } from "~/shared/ui/PasswordInput";
import { RegistrButton } from "~/shared/ui/registrButton";
import { CONSTANTS } from "~/shared/lib/strings";

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () =>{
      const {
        register: loginRegister,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors },
      } = useForm<LoginFormData>();

        const onLoginSubmit = (data: LoginFormData) => {
    console.log("Login data:", data);
  };

    
      return(
        <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="flex flex-col justify-center gap-4 px-6">
                      <p className="text-grey flex justify-center">
                        {CONSTANTS.auth.label.enterLogin}
                      </p>
                      
                      <EmailInput
                        {...loginRegister("email", {
                          required: "Email обязателен",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Неверный формат email"
                          }
                        })}
                        error={loginErrors.email?.message}
                      />
                      
                      <PasswordInput
                        label="Пароль"
                        placeholder="Минимум 6 символов"
                        {...loginRegister("password", {
                          required: "Пароль обязателен",
                          minLength: {
                            value: 6,
                            message: "Пароль должен содержать минимум 6 символов"
                          }
                        })}
                        error={loginErrors.password?.message}
                      />
                      
                      <div className="pt-3">
                        <RegistrButton text="Войти в аккаунт" />
                      </div>
                    </form>
      )
}