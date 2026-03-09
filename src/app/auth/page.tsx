"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AuthTabs } from "~/features/AuthTabs";
import { CONSTANTS } from "~/shared/lib/strings";
import logoImage from "~/shared/assets/icons/cinemateLogo.svg";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function HomePage() {
  const [selectedTab] = useState(0);

  const welcomeTexts = ["Добро пожаловать обратно!", "Присоединяйтесь к нам!"];
  return (
    <main>
      <div>
        <Link className="absolute top-6 left-32" href="/">
          <Image src={logoImage as string} alt="Cinemate Logo" width={250} />
        </Link>
        <div className="flex min-h-screen items-center justify-center">
          <div className="relative flex flex-col items-center justify-center gap-[clamp(1rem,3vw,2rem)]">
            <p className="gradient text-3xl">{welcomeTexts[selectedTab]}</p>
            <div className="flex gap-2">
              <Sparkles className="text-orange" />
              <p className="text-orange text-xl">{CONSTANTS.auth.label.open}</p>
              <Sparkles className="text-orange"/>
            </div>
            <div className="bg-glass relative flex w-100 justify-center rounded-3xl border border-gray-600 shadow-2xl">
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
