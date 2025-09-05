import React from "react";
import Image from "next/image";
import Barrow from '~/shared/assets/icons/rightBarrow.svg'

interface ButtonProps {
  text: string;
}


export const RegistrButton = ({text}: ButtonProps) => {
    return(
        <div >
            <button type="submit" className="text-white bg-gradient-to-r w-full from-lightorange  to-darkorange py-3 rounded-xl hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-700 hover:shadow-2xl ease-in-out transition-shadow hover:shadow-yellow-300/60 duration-200">
                <div className="flex justify-center gap-3">
                <p>{text}</p>
                <Image 
                src={Barrow}
                alt="star"
                width={12}
                className="filter brightness-0 invert opacity-100"
              />
                </div>
            </button>
        </div>
    )
}