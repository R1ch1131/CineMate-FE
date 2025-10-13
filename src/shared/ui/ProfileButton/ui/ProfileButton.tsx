'use client'

import { Bell } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import noAvatar from '~/shared/assets/icons/noAvatar.jpg'

export const ProfileButton = () => {
const session = useSession()

 const emailWithoutDomain = session.data?.user?.email?.split('@')[0]

    return(
        <div className="flex gap-4">
            <div className="flex center hover:bg-glass px-4 rounded-2xl">
                <Bell className="w-5 h-5"/>
            </div>
            <Link href='/profile' className="flex center gap-2 hover:bg-glass px-4 py-3 rounded-2xl">
                {session?.data?.user?.image ? ( <img
                className="h-7 w-7 rounded-full"
                src={session.data.user.image}
                alt="ava"
              />) : ( <Image
                className="h-7 w-7 rounded-full"
                src={noAvatar}
                alt="ava"
              />)}
                <p>{session.data?.user?.name}</p>
            </Link>
        </div>
    )
}