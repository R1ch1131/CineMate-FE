import React from "react";

interface AuthButton{
    text : string
}

export const AuthButton = ({text} : AuthButton) => {
    return(
        <button className="text-white 2k:text-xl bg-gradient-to-r from-lightorange to-darkorange py-2.5 px-6 rounded-xl hover:bg-gradient-to-r hover:from-amber-700 hover:to-orange-800 hover:shadow-2xl ease-in-out transition-shadow hover:shadow-yellow-300/60 duration-200">
            {text}
        </button>
    )
}