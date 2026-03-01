'use client'

import { Description, Field, Input, Textarea } from "@headlessui/react";
import { Edit3, LogOut, Shield } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import noAvatar from "~/shared/assets/icons/noAvatar.jpg";
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export const ProfileSettingTab = () => {
  const session = useSession();

  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

  };

  const handleDeleteAvatar = () => {
    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

  };

  return (
    <div className="flex gap-7 py-5">
      <div className="w-9/12">
        <div className="bg-glass rounded-2xl border border-frostedglass p-8">
          <div className="flex gap-3 items-center pb-4">
            <Edit3 className="text-lightorange" />
            <p className="text-white text-2xl">Редактирование профиля</p>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <Image
                width={100}
                height={100}
                className="h-25 w-25 rounded-2xl object-cover"
                src={preview || session?.data?.user?.image || noAvatar}
                alt="ava"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-white text-lg font-bold">Фото профиля</p>
              <p className="text-grey pb-1">
                Загрузите изображение размером не менее 400x400 пикселей
              </p>

              <div className="flex gap-3">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer bg-gradient-to-r from-lightorange to-darkorange rounded-xl transition-all hover:scale-105 py-1.5 px-3 text-white"
                >
                  <p>Изменить</p>
                </button>

                <div
                  onClick={handleDeleteAvatar}
                  className="cursor-pointer bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all hover:scale-105 py-1.5 px-3"
                >
                  <p>Удалить</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-frostedglass border-b py-3" />

          <div className="grid grid-cols-2 gap-10">
            <div>
              <Field>
                <div className="flex flex-col gap-2">
                  <Description className="text-sm pt-6 text-white/50">
                    Имя пользователя
                  </Description>
                  <div className="relative">
                    <Input
                      type="text"
                      className="outline-grey bg-frostedglass focus:outline-lightorange block w-full rounded-xl py-3 pl-5 text-sm/6 text-white outline-1"
                      placeholder="Введите ваше имя"
                    />
                  </div>
                </div>
              </Field>
            </div>

            <div>
              <Field>
                <div className="flex flex-col gap-2">
                  <Description className="text-sm pt-6 text-white/50">
                    Email
                  </Description>
                  <div className="relative">
                    <Input
                      type="text"
                      className="outline-grey bg-frostedglass focus:outline-lightorange block w-full rounded-xl py-3 pl-5 text-sm/6 text-white outline-1"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </Field>
            </div>
          </div>

          <div>
            <Field>
              <Description className="text-sm pt-4 text-white/50">
                Биография
              </Description>
              <Textarea
                className="mt-2 outline-grey bg-frostedglass focus:outline-lightorange block w-full rounded-xl py-3 pl-5 text-sm/6 text-white outline-1 resize-none"
                rows={3}
                placeholder="Расскажите о себе, ваших любимых жанрах и фильмах..."
              />
            </Field>
            <p className="text-grey/40 text-sm py-3">Максимум 200 символов</p>

            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex center transition-all hover:scale-101 h-13 cursor-pointer">
              <p className="text-xl text-white">Сохранить изменения</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-4/12 flex flex-col gap-6">
        <div className="bg-glass border border-frostedglass flex flex-col gap-4 rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <Shield className="text-green-500" />
            <p className="text-white font-bold text-xl">Статус аккаунта</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-grey">Уровень</p>
            <p className="text-lightorange">enthusiast</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-grey">Присоединился</p>
            <p className="text-white">янв. 2024 г.</p>
          </div>
        </div>

        <div className="bg-glass rounded-2xl border border-frostedglass py-5 px-6">
          {session?.data ? (
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex center gap-3 w-full bg-red-500/10 border border-red-500/20 hover:bg-red-500/25 transition-all hover:scale-102 p-4 rounded-2xl cursor-pointer"
            >
              <LogOut className="text-red-400" />
              <div className="flex flex-col gap-1">
                <p className="text-red-400">Выйти из аккаунта</p>
                <p className="text-red-300/70 text-sm">Завершить сессию</p>
              </div>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};