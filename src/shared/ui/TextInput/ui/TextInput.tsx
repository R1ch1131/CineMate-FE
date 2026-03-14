import React from "react";
import { Field, Input } from '@headlessui/react'
import type { UseFormRegisterReturn } from "react-hook-form";
import { User } from 'lucide-react';

interface TextInputProps {
  error?: string;
  register?: UseFormRegisterReturn;
  placeholder?: string;
  label?: string;
  disabled?: boolean; 
}

export const TextInput: React.FC<TextInputProps> = ({
  error,
  register,
  placeholder = "Как к вам обращаться",
  label = "Ваше имя",
  disabled = false, 
  ...props
}) => {
  return (
    <div className="w-full">
      <Field>
        <div className="flex flex-col gap-2">
          <p className="px-1 text-white text-sm">{label}</p>
          <div className="relative">
            <Input 
              type="text"
              placeholder={placeholder}
              disabled={disabled}
              className={`block w-full rounded-xl outline-1 outline-grey bg-frostedglass py-3 text-sm/6 text-white focus:outline-lightorange pl-12 ${
                error ? 'outline-red-500' : ''
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
              {...register}
              {...props}
            />
            <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2">
              <User className={disabled ? 'text-gray-400' : 'text-white'}/> 
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