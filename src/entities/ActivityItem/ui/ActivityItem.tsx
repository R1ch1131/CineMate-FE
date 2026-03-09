'use client'

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

interface ActivityItemProps{
    name: string,
    action: string,
    film: string,
    image: StaticImageData,
}

export const ActivityItem = ({name, action, film, image}: ActivityItemProps) => {


    return(
        <div className="w-85 h-15 flex items-center gap-4 px-2 transition-transform hover:translate-x-2.5 duration-400 group cursor-default">
            <Image 
                style={{ objectPosition: "center center" }} 
                className="h-10 w-10 rounded-full object-cover" 
                src={image} 
                alt={"avatar"} 
            />
            <div className="flex-1 min-w-0">
                <Link className="font-medium group-hover:text-amber-400 transition-colors" href={"/publicProfile"}>
                    {name}
                </Link>
                <span className="text-gray-400 mx-1">{action}</span>
                <span 
                    className="font-medium group-hover:text-amber-400 transition-colors cursor-pointer"
                >
                    {film}
                </span>
            </div>
        </div>
    )
}