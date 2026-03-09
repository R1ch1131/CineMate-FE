import { Heart, MessageCircleCode, Star } from "lucide-react";
import Image from "next/image";
import Img from "~/shared/assets/icons/filmImage.jpg"

export const ReviewProfile = () => {
  return (
    <div className="bg-frostedglass hover:bg-white/15 rounded-2xl flex justify-between transition-all hover:scale-101 gap-5 p-5 border border-white/25">
      <div>
        <Image className="h-37 w-25 rounded-2xl object-cover shadow-2xl shadow-amber-500/30" src={Img} alt={"ava"}/>
      </div>
      <div className="flex-1"> 
        <div className="flex flex-col gap-2">
          <p className="text-xl">Дюна: Часть вторая</p>
          <p>2024</p>
        </div>
        <p className="py-5">Невероятная кинематография и звуковое сопровождение делаютшедевром научной фантастики.</p>
        <div className="flex justify-between">
          <div className="flex gap-5">
            <button className="flex gap-1">
              <Heart width={17} />
              321
            </button>
            <button className="flex gap-1">
              <MessageCircleCode width={17} />
              321
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col justify-between items-end"> 
        <div className="bg-amber-400 rounded-xl h-10 px-3 flex gap-1 items-center"> 
          <Star width={17} />
          <p>9.2</p>
        </div>
        <p className="whitespace-nowrap pr-7 pb-1 text-sm">2 часа назад</p> 
      </div>
    </div>
  );
};