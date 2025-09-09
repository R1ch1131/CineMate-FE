import React from "react";
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

export const RegisterForm = () => {
      // Форма для регистрации
      const {
        register: registerRegister,
        handleSubmit: handleRegisterSubmit,
        formState: { errors: registerErrors },
        watch, // Для валидации подтверждения пароля
      } = useForm<RegisterFormData>();
    
      const password = watch("password");
    
      const onRegisterSubmit = (data: RegisterFormData) => {
        console.log("Register data:", data);
      };

      return(
        <form onSubmit={handleRegisterSubmit(onRegisterSubmit)} className="flex flex-col justify-center gap-4 px-6">
              <p className="text-grey flex justify-center">
                Создайте аккаунт за пару секунд
              </p>
              
              <TextInput
                {...registerRegister("name", {
                  required: "Имя обязательно",
                  minLength: {
                    value: 2,
                    message: "Имя должно содержать минимум 2 символа"
                  }
                })}
                error={registerErrors.name?.message}
              />
              
              <EmailInput
                {...registerRegister("email", {
                  required: "Email обязателен",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Неверный формат email"
                  }
                })}
                error={registerErrors.email?.message}
              />
              
              <PasswordInput
                label="Пароль"
                placeholder="Минимум 6 символов"
                {...registerRegister("password", {
                  required: "Пароль обязателен",
                  minLength: {
                    value: 6,
                    message: "Пароль должен содержать минимум 6 символов"
                  }
                })}
                error={registerErrors.password?.message}
              />
              
              <PasswordInput
                label="Подтвердите пароль"
                placeholder="Повторите пароль"
                {...registerRegister("confirmPassword", {
                  required: "Подтверждение пароля обязательно",
                  validate: value => value === password || "Пароли не совпадают"
                })}
                error={registerErrors.confirmPassword?.message}
              /> 
              <div className="pt-3">
                <RegistrButton text="Создать аккаунт" />
              </div>
            </form>
      )
}