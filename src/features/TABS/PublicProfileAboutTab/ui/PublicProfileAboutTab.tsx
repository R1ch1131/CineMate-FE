import Image from "next/image";
import Ava from "~/shared/assets/icons/noAvatar.jpg"

export const PublicProfileAboutTab = () => {
  return (
    <div className="flex flex-col gap-7 pt-3">
      <div className="bg-frostedglass p-7 flex flex-col gap-5 rounded-2xl border border-white/25">
        <p className="text-xl font-bold">Интересы</p>
        <div className="flex gap-3">
        <div className="bg-violet-500/40 flex rounded-2xl py-1 px-2 border text-violet-300 border-violet-400/30">
          <p>Европейское кино</p>
        </div>
        <div className="bg-violet-500/40 flex rounded-2xl py-1 px-2 border text-violet-300 border-violet-400/30">
          <p>Европейское кино</p>
        </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-7 ">
        <div className="bg-frostedglass p-7 flex flex-col gap-3 rounded-2xl border border-white/25">
          <p>Любимые режиссеры</p>
          <div className="flex gap-2 items-center">
            <Image className="h-8 w-8 rounded-full object-cover" src={Ava} alt="Ava" />
            <p>Денис Вильнёв</p>
          </div>
          <div className="flex gap-2 items-center">
            <Image className="h-8 w-8 rounded-full object-cover" src={Ava} alt="Ava" />
            <p>Денис Вильнёв</p>
          </div>
          <div className="flex gap-2 items-center">
            <Image className="h-8 w-8 rounded-full object-cover" src={Ava} alt="Ava" />
            <p>Денис Вильнёв</p>
          </div>
        </div>
        <div>
          <div className="bg-frostedglass p-7 flex flex-col gap-3 rounded-2xl border border-white/25">
          <p>Любимые актеры</p>
          <div className="flex gap-2 items-center">
            <Image className="h-8 w-8 rounded-full object-cover" src={Ava} alt="Ava" />
            <p>Денис Вильнёв</p>
          </div>
          <div className="flex gap-2 items-center">
            <Image className="h-8 w-8 rounded-full object-cover" src={Ava} alt="Ava" />
            <p>Денис Вильнёв</p>
          </div>
          <div className="flex gap-2 items-center">
            <Image className="h-8 w-8 rounded-full object-cover" src={Ava} alt="Ava" />
            <p>Денис Вильнёв</p>
          </div>
        </div>
        </div>
      </div>
      <div className="bg-frostedglass p-7 flex flex-col gap-5 rounded-2xl border border-white/25">
        <p>Социальные сети</p>
        <div className="flex flex-col gap-2">
          <div className="bg-frostedglass rounded-xl flex justify-between py-3 px-4">
            <p>Twitter</p>
            <p>@anna_critic</p>
          </div>
          <div className="bg-frostedglass rounded-xl flex justify-between py-3 px-4">
            <p>Twitter</p>
            <p>@anna_critic</p>
          </div>
          <div className="bg-frostedglass rounded-xl flex justify-between py-3 px-4">
            <p>Twitter</p>
            <p>@anna_critic</p>
          </div>
          <div className="bg-frostedglass rounded-xl flex justify-between py-3 px-4">
            <p>Twitter</p>
            <p>@anna_critic</p>
          </div>
        </div>
      </div>
    </div>
  );
};
