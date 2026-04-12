import React, { useState } from "react";
import { Field, Input } from "@headlessui/react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Lock, Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  error?: string;
  register?: UseFormRegisterReturn;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  error,
  register,
  placeholder,
  label,
  disabled = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      <Field>
        <div className="flex flex-col gap-2">
          <p className="px-1 text-white text-sm">{label}</p>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              disabled={disabled} 
              className={`block w-full rounded-xl outline-1 outline-grey bg-frostedglass py-3 text-sm/6 text-white focus:outline-lightorange pl-12 pr-12 ${
                error ? "outline-red-500" : ""
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              {...register}
              {...props}
            />

            <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
              <Lock className={`${disabled ? 'text-gray-400' : 'text-white'} w-5 h-5`} />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={disabled} 
              className={`absolute right-3.5 top-1/2 -translate-y-1/2 ${disabled ? 'text-gray-400 cursor-not-allowed' : 'text-white'}`} 
            >
              {showPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>

          {error && (
            <p className="px-1 text-red-500 text-xs">{error}</p>
          )}
        </div>
      </Field>
    </div>
  );
};