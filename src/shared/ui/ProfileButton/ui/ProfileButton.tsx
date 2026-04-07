'use client'

import { Bell } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import noAvatar from '~/shared/assets/icons/noAvatar.jpg'

export const ProfileButton = () => {
  const { data: session } = useSession();
  const displayName = session?.user?.name ?? session?.user?.email?.split('@')[0] ?? "Гость";
  const userImage = session?.user?.image ?? noAvatar;

  return (
    <div className="flex gap-4">
      <div className="flex items-center justify-center hover:bg-glass px-4 rounded-2xl cursor-pointer transition-colors">
        <Bell className="w-5 h-5 text-grey hover:text-white" />
      </div> 
      <Link 
        href='/profile' 
        className="flex items-center gap-2 hover:bg-glass px-4 py-3 rounded-2xl transition-all border border-transparent hover:border-white/10"
      >
        <div className="relative h-7 w-7 overflow-hidden rounded-full border border-white/10 bg-white/5">
          <Image
            fill
            className="object-cover"
            src={userImage}
            alt="User avatar"
            unoptimized={typeof userImage === 'string'}
          />
        </div>
        
        <p className="text-sm font-medium text-white tracking-wide">
          {displayName}
        </p>
      </Link>
    </div>
  );
}