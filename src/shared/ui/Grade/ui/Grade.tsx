import type { LucideIcon } from "lucide-react";

interface GradeProps{
    icon?: LucideIcon
    iconColor?: string,
    style: string
    text:string,
}

export const Grade = ({icon: Icon, iconColor, style, text}: GradeProps) =>{
    return(
        <div className={`mt-5 flex h-10 w-35 items-center justify-center gap-2 text-amber-500 rounded-full ${style}`}>
            {Icon && <Icon className={`h-4 w-4 ${iconColor}`} />}
            <p>{text}</p>
          </div>
    )
}

