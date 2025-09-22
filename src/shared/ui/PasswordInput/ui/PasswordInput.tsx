import React from "react";
import { Field, Input } from '@headlessui/react'
import type { UseFormRegisterReturn } from "react-hook-form";
import { Lock } from 'lucide-react';

interface PasswordInputProps {
  error?: string;
  register?: UseFormRegisterReturn;
  placeholder?: string;
  label?: string;
}
export const PasswordInput: React.FC< PasswordInputProps> = ({
  error,
  register,
  placeholder,
  label,
  ...props
}) => {
  return (
    <div className="w-full">
      <Field>
        <div className="flex flex-col gap-2">
          <p className="px-1 text-white text-sm">{label}</p>
          <div className="relative">
            <Input 
              type="password"
              placeholder={placeholder}
              className={`block w-full rounded-xl outline-1 outline-grey bg-frostedglass py-3 text-sm/6 text-white focus:outline-lightorange pl-12 ${
                error ? 'outline-red-500' : ''
              }`}
              {...register}
              {...props}
            />
            <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2">
              <Lock className='text-white'/>
            </div>
          </div>
          {error && (
            <p className="px-1 text-red-500 text-xs">{error}</p>
          )}
        </div>
      </Field>
    </div>
  );
};