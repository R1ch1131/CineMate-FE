'use client'

import { Description, Field, Input, Textarea } from "@headlessui/react";
import { Edit3, LogOut, Shield, Loader2, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import noAvatar from "~/shared/assets/icons/noAvatar.jpg";
import { useSession, signOut } from 'next-auth/react';

interface ProfileSettingTabProps {
  onUpdate?: () => void;
}

interface FormState {
  username: string;
  email: string;
  bio: string;
  createdAt: string; 
}

export const ProfileSettingTab = ({ onUpdate }: ProfileSettingTabProps) => {
  const { data: session, update } = useSession();
  
  const user = session?.user;
  const token = (user as { accessToken?: string })?.accessToken;

  const [formData, setFormData] = useState<FormState>({ 
    username: "", 
    email: "", 
    bio: "", 
    createdAt: "" 
  });
  
  const [initialData, setInitialData] = useState<FormState>({ 
    username: "", 
    email: "", 
    bio: "", 
    createdAt: "" 
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (user) {
      const data: FormState = {
        username: user.name ?? "",
        email: user.email ?? "",
        bio: (user as { bio?: string }).bio ?? "",
        createdAt: (user as { createdAt?: string }).createdAt ?? ""
      };
      
      setFormData(data);
      setInitialData(data);
    }
  }, [session, user]);

  const handleSave = async () => {
    if (!token || isSaving) return;
    setIsSaving(true);
    setIsSuccess(false);

    try {
      if (formData.username !== initialData.username) {
        await fetch('/api/profile/username', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ username: formData.username })
        });
      }

      if (formData.email !== initialData.email) {
        await fetch('/api/profile/email', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ newEmail: formData.email })
        });
      }

      if (formData.bio !== initialData.bio) {
        await fetch('/api/profile/bio', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ bio: formData.bio })
        });
      }

      await update({
        user: {
          ...user,
          name: formData.username,
          email: formData.email,
          bio: formData.bio,
          createdAt: formData.createdAt 
        }
      });

      if (onUpdate) {
        setTimeout(() => onUpdate(), 300);
      }

      setIsSuccess(true);
      setInitialData({ ...formData });
      setTimeout(() => setIsSuccess(false), 3000);

    } catch (error) {
      console.error("Ошибка сохранения:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex gap-7 py-5">
      <div className="w-9/12">
        <div className="bg-glass rounded-2xl border border-frostedglass p-8">
          <div className="flex gap-3 items-center pb-4">
            <Edit3 className="text-lightorange" />
            <p className="text-white text-2xl font-bold">Редактирование</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Image 
              width={100} height={100} 
              className="h-25 w-25 rounded-2xl object-cover" 
              src={preview ?? user?.image ?? noAvatar} 
              alt="avatar" 
            />
            <div className="flex flex-col gap-1">
              <p className="text-white text-lg font-bold">Фото профиля</p>
              <div className="flex gap-3 mt-2">
                <input 
                  type="file" accept="image/*" ref={fileInputRef} className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setPreview(URL.createObjectURL(file));
                  }} 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()} 
                  className="cursor-pointer bg-orange-500 rounded-xl py-1.5 px-4 text-white hover:bg-orange-600 transition-colors"
                >
                  Изменить
                </button>
                <button 
                  onClick={() => setPreview(null)} 
                  className="cursor-pointer bg-gray-500/20 rounded-xl py-1.5 px-4 text-white hover:bg-gray-500/40 transition-colors"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 mt-6">
            <Field>
              <Description className="text-sm text-white/50 mb-2">Имя</Description>
              <Input 
                value={formData.username} 
                onChange={(e) => setFormData({ ...formData, username: e.target.value })} 
                className="outline-grey bg-frostedglass focus:outline-lightorange block w-full rounded-xl py-3 pl-5 text-white outline-1" 
              />
            </Field>
            <Field>
              <Description className="text-sm text-white/50 mb-2">Email</Description>
              <Input 
                value={formData.email} 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                className="outline-grey bg-frostedglass focus:outline-lightorange block w-full rounded-xl py-3 pl-5 text-white outline-1" 
              />
            </Field>
          </div>

          <Field className="mt-6">
            <Description className="text-sm text-white/50 mb-2">Биография</Description>
            <Textarea 
              value={formData.bio} 
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })} 
              rows={3}
              className="outline-grey bg-frostedglass focus:outline-lightorange block w-full rounded-xl py-3 pl-5 text-white outline-1 resize-none" 
            />
          </Field>

          <button 
            disabled={isSaving} 
            onClick={() => { void handleSave(); }} 
            className={`w-full mt-8 rounded-2xl flex items-center justify-center h-13 transition-all cursor-pointer
              ${isSuccess ? 'bg-green-600' : 'bg-green-600 hover:bg-green-700'} 
              disabled:opacity-50`}
          >
            {isSaving ? (
              <Loader2 className="animate-spin text-white" />
            ) : isSuccess ? (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-white" />
                <p className="text-white font-bold">Изменения сохранены</p>
              </div>
            ) : (
              <p className="text-white font-bold">Сохранить изменения</p>
            )}
          </button>
        </div>
      </div>

      <div className="w-4/12 flex flex-col gap-6">
        <div className="bg-glass border border-frostedglass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-green-500" />
            <p className="text-white font-bold">Статус</p>
          </div>
          <p className="text-grey text-sm">Уровень: <span className="text-lightorange">enthusiast</span></p>
          {/* Добавляем отображение даты регистрации для проверки */}
          {formData.createdAt && (
             <p className="text-grey text-[12px] mt-2 italic">
               В системе с: {new Date(formData.createdAt).toLocaleDateString('ru-RU')}
             </p>
          )}
        </div>
        
        <div className="flex center bg-frostedglass rounded-2xl border-white/32 p-5">
          <button 
            onClick={() => { void signOut({ callbackUrl: '/' }); }} 
            className="flex items-center justify-center gap-3 w-full bg-red-500/10 p-4 rounded-2xl text-red-400 font-bold border border-red-500/20 hover:bg-red-500/20 transition-all cursor-pointer"
          >
            <LogOut /> Выйти
          </button>
        </div>
      </div>
    </div>
  );
};