import { CircleSmall } from "lucide-react"

export const LikeGenres = () =>{
    return(
        <div className="flex gap-0.5 center border border-white/30 bg-frostedglass p-2.5 rounded-2xl">
            <CircleSmall className="text-red-500" fill="currentColor" size={20} />           
            <p>Drama</p>
        </div>
    )
}