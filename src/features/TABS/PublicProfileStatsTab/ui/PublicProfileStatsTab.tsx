import { LikeGenres } from "~/shared/ui/LikeGenres/ui/LikeGenres";
import Image from "next/image";
import Film from "~/shared/assets/icons/filmImage.jpg"

export const PublicProfileStatsTab = () => {
  return (
   
    <div className="flex flex-col w-260 gap-7 pt-3 pb-10">
     <div className="bg-frostedglass p-7 rounded-2xl border border-white/30">
      <p className="text-xl font-bold pb-5">Любимые жанры</p>
      <div className="flex gap-3">
      <LikeGenres />
      <LikeGenres />
      <LikeGenres />
      </div>
     </div>
     <div className="bg-frostedglass p-7 rounded-2xl border border-white/30">
      <p className="text-xl font-bold pb-5">Любимые фильмы</p>
      <div className="flex gap-5">
      <div>
          <Image className="h-60 w-80 mb-1 object-cover rounded-2xl" src={Film} alt="Film"/>
          <p>Паразиты</p>
      </div>
      <div>
          <Image className="h-60 w-80 mb-1 object-cover rounded-2xl" src={Film} alt="Film"/>
          <p>Паразиты</p>
      </div>
      <div>
          <Image className="h-60 w-80 mb-1 object-cover rounded-2xl" src={Film} alt="Film"/>
          <p>Паразиты</p>
      </div>
      </div>
     </div>
    </div>
  );
};
