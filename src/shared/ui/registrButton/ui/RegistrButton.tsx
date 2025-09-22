import React from "react";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  text: string;
}


export const RegistrButton = ({text}: ButtonProps) => {
    return(
        <div >
            <button type="submit" className="text-white bg-gradient-to-r w-full from-lightorange  to-darkorange py-3 rounded-xl hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-700 hover:shadow-2xl ease-in-out transition-shadow hover:shadow-yellow-300/60 duration-200">
                <div className="flex justify-center gap-3">
                <p>{text}</p>
                  <ArrowRight width={20}/>
                </div>
            </button>
        </div>
    )
}