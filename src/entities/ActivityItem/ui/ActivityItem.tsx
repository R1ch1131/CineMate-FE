import React from "react";
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
        <div className="w-85 h-15 flex items-center gap-4 px-2">
            <Image 
            style={{ objectPosition: "center center" }} className="h-10 w-10 rounded-full object-cover" src={image} alt={"avatar"} />
            <div className="flex-1 min-w-0">
                <Link  className="text-white font-medium group-hover:text-amber-400 transition-colors" href={"/profile"}>{name}</Link>
                <span className="text-gray-400 mx-1">{action}</span>
                <span className="text-amber-400">{film}</span>
            </div>
        </div>
    )
}