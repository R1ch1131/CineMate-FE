import React from "react";
import Image from "next/image";
import Actor1 from "~/shared/assets/icons/actor.jpg"

export const Actor = () => {
    return(
        <div className="flex">
            <div className="flex flex-col justify-center items-center gap-4 hover:-translate-y-1.5 transition-transform">
                <div className="relative h-58 w-58 lg:h-50 lg:w-50">
                    <Image
                        fill
                        className="rounded-2xl object-cover"
                        src={Actor1}
                        alt="actor"
                    />
                </div>
                <div className="flex flex-col items-center">
                <p className="text-white">Тимоти Шаламе</p>
                <p className="text-grey">Пол Атрейдес</p>
                </div>
            </div>
        </div>
    )
}