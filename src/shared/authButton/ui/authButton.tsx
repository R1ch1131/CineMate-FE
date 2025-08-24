import Link from "next/link";
import React from "react";

export const AuthButton = () => {
    return(
        <Link href="/auth" className="text-white bg-gradient-to-r from-amber-500  to-amber-700 py-2.5 px-6 rounded-xl hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-700 hover:shadow-2xl ease-in-out transition-shadow hover:shadow-yellow-300/60 duration-200">
            Войти
        </Link>
    )
}