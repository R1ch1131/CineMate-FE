import React from "react";

export const MediaTab = () => {
    return(
        <div className="text-white flex flex-col p-3 2k:p-5 2k:gap-7 gap-4">
            <p className="text-xl 2k:text-2xl font-bold">Медиаматериалы</p>
            <p className="text-lg  2k:text-xl font-bold">Трейлеры и видео</p>
            <div className="flex gap-14">
                <div className="bg-black 2k:h-70 2k:w-100 h-50 w-72 rounded-xl"/>
                 <div className="bg-black 2k:h-70 2k:w-100 h-50 w-75 rounded-xl"/>
                  <div className="bg-black 2k:h-70 2k:w-100 h-50 w-75 rounded-xl"/>
            </div>
            {/* <div className="bg-frostedglass p-4 rounded-2xl flex flex-col gap-3">
                <p className="text-lg font-bold">Где посмотреть</p>
                <div className="grid grid-cols-3 gap-5">
                    <LinkButton name="Netflix" cost="Подписка" color="bg-red-500" />
                    <LinkButton name="iTunes" cost="Аренда $3.99" color="bg-blue-500" />
                    <LinkButton name="Amazon" cost="Покупка $14.99" color="bg-purple-500" />
                </div>
            </div> */}
        </div>
    )
}