import { StatsBlock } from "~/shared/ui/StatsBlock/ui/StatsBlock";
import { TopBar } from "~/widgets/topBar/ui/TopBar";
import Image from "next/image";
import Paper from '~/shared/assets/icons/paper.png'
import { CONSTANTS } from "~/shared/lib/strings";

export default function HomePage() {
  return (
    <main>
      <TopBar />
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="flex justify-center items-center gap-3">
        <Image width={30} style={{
            filter:
              "brightness(0) saturate(100%) invert(56%) sepia(93%) saturate(259%) hue-rotate(345deg) brightness(97%) contrast(92%)",
          }} src={Paper} alt=""/>
        <p className="text-lightorange text-2xl">{CONSTANTS.mainPage.news}</p>
        </div>
        <p className="text-5xl font-bold">
         <span className="text-white">{CONSTANTS.mainPage.all} </span>  
         <span className="gradient">{CONSTANTS.mainPage.cinema}</span>
          </p>
          <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-grey">
          {CONSTANTS.mainPage.newRewiews}
          </p>
        <p className="text-grey">{CONSTANTS.mainPage.filmfan}</p>
          </div>
        <StatsBlock />
      </div>
    </main>
  );
}