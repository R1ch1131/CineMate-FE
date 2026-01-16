'use client'

import { Description, Field, Input, Textarea } from "@headlessui/react";
import { Edit3, LogOut, Shield } from "lucide-react";
import Image from "next/image";
import React from "react";
import noAvatar from "~/shared/assets/icons/noAvatar.jpg";
import {signOut} from 'next-auth/react'
import {useSession} from 'next-auth/react'

export const ProfileSettingTab = () => {

  const session = useSession()
  
  return (
    <div className="flex gap-7 py-5">
      <div className="w-9/12">
        <div className="bg-glass rounded-2xl border border-frostedglass p-8">
          <div className="flex gap-3 items-center pb-4">
            <Edit3 className="text-lightorange"/>
            <p className="text-white text-2xl">Редактирование профиля</p>
          </div>
          <div className="flex items-center gap-4">
            <div>
                {session?.data?.user?.image ? ( <Image
                width={100}
                height={100}
                className="h-25 w-25 rounded-2xl object-cover"
                src={session.data.user.image}
                alt="ava"
              />) : ( <Image
                className="h-25 w-25 rounded-2xl object-cover"
                src={noAvatar}
                alt="ava"
              />)}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-white text-lg font-bold">Фото профиля</p>
              <p className="text-grey pb-1">
                Загрузите изображение размером не менее 400x400
                пикселей
              </p>
              <div className="flex gap-4">
                <div className="from-lightorange to-darkorange rounded-xl bg-gradient-to-r py-1.5 px-2 text-white">
                  <p>Изменить</p>
                </div>
                <div className="bg-glass rounded-xl py-1.5 px-2 text-white">
                  <p>Удалить</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-frostedglass border-b py-3" />
          <div className="grid grid-cols-2 gap-10">
            <div>
              <div className="w-full">
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
            </div>
            <div>
              <div className="w-full">
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
          </div>
          <div>
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
            </div>
            <div className="bg-green-500/80 rounded-2xl flex items-center h-13 pl-5">
                <p className="text-xl text-white">Сохранить изменения</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-4/12 flex flex-col gap-6">
      <div className="bg-glass border border-frostedglass flex flex-col gap-4 rounded-2xl p-6">
        <div className="flex items-center gap-3">
        <Shield className="text-green-500"/>
        <p className="text-white font-bold text-xl">Статус аккаунта</p>
        </div>
        <div className="flex items-center justify-between ">
            <p className="text-grey">Статус</p>
            <span className="flex items-center gap-1">
             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-green-500">Активен</p>
            </span>
        </div>
        <div className="flex items-center justify-between ">
            <p  className="text-grey">Уровень</p>
            <p className="text-lightorange">enthusiast</p>
        </div>
        <div className="flex items-center justify-between ">
            <p  className="text-grey">Присоединился</p>
            <p className="text-white">янв. 2024 г.</p>
        </div>
      </div>
      <div className="bg-glass rounded-2xl border border-frostedglass py-5 px-6">

        {session?.data ? (
        <button onClick={() => signOut({ 
          callbackUrl: '/'})} 
          className="flex center gap-3 w-full bg-red-500/10 border border-red-500/20 p-4 rounded-2xl">
            <LogOut className="text-red-400"/>
            <div className="flex flex-col gap-1">
                <p className="text-red-400">Выйти из аккаунта</p>
                <p className="text-red-300/70 text-sm">Завершить сессию</p>
            </div>
        </button>
        ): ('')
        }
      </div>
      </div>
    </div>
  );
};
