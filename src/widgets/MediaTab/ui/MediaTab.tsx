import React from "react";
import { LinkButton } from "~/shared/ui/LinkButton";

export const MediaTab = () => {
    return(
        <div className="text-white">
            <p className="text-xl font-bold">Медиаматериалы</p>
            <p className="text-lg font-bold">Трейлеры и видео</p>
            <div className="bg-frostedglass p-5 rounded-2xl flex flex-col gap-3">
                <p className="text-xl font-bold">Где посмотреть</p>
                <div className="grid grid-cols-3 gap-5">
                    <LinkButton name="Netflix" cost="Подписка" color="bg-red-500" />
                    <LinkButton name="iTunes" cost="Аренда $3.99" color="bg-blue-500" />
                    <LinkButton name="Amazon" cost="Покупка $14.99" color="bg-purple-500" />
                </div>
            </div>
        </div>
    )
}