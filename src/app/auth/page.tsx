'use client'

import React, { useState } from "react";
import Image from "next/image";
import starImage from '~/shared/assets/icons/stars.svg';
import { AuthTabs } from "~/widgets/AuthTabs";
import {CONSTANTS} from "~/shared/lib/strings"
import logoImage from '~/shared/assets/icons/cinemateLogo.svg';
import Link from "next/link";

export default function HomePage() {
  const [selectedTab] = useState(0);

  const welcomeTexts = [
    "Добро пожаловать обратно!",
    "Присоединяйтесь к нам!"
  ];

   return (
    <main> 
      <div> 
         <Link className="absolute top-7 left-32" href="/">
          <Image src={logoImage}  
            alt="Cinemate Logo"
            width={250} 
          />
        </Link>
        <div className="min-h-screen flex items-center justify-center">

        <div className="relative flex flex-col justify-center items-center gap-[clamp(1rem,3vw,2rem)]">
          <p className="gradient text-3xl">{welcomeTexts[selectedTab]}</p>
          <div className="flex gap-2">
            <Image 
                src={starImage}
                alt="star"
                width={19}
              />
            <p className="text-orange text-xl">{CONSTANTS.auth.label.open}</p>
            <Image 
                src={starImage}
                alt="star"
                width={19}
              />
          </div>
          <div className="relative flex justify-center w-[400px] bg-glass shadow-2xl border-1 border-gray-600 rounded-3xl">
            <div className="my-10 w-full">
              <AuthTabs /> 
            </div>
          </div>
        </div>
        </div>
      </div> 
    </main> 
  );
}