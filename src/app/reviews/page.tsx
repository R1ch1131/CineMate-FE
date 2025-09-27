import { Plus } from "lucide-react"
import { FiltersReviews } from "~/features/FiltersReviews";
import { HotDebate } from "~/features/HotDebate";

export default function HomePage() {
  return (
    <main>
      <div className="flex flex-col justify-center items-center gap-4 pb-8">
      <span className="text-white text-4xl font-bold">Рецензии</span>
      <span className="flex flex-col gap-1 items-center">
        <p className="text-grey">Читайте мнения других киноманов, делитесь своими впечатлениями и</p>
        <p className="text-grey">учавствуйте в обсуждениях</p>
      </span>
      </div>
      <div className="flex justify-center">
      <div className="w-4/6 flex gap-10">
        <div className=" w-4/12 flex flex-col gap-5">
          <div className="w-full h-14 bg-gradient-to-r from-lightorange to-darkorange rounded-2xl flex items-center justify-center text-white gap-2">
            <Plus className="w-5 h-5"/>
             <p>Написать рецензию</p>
          </div>
          <FiltersReviews />
          <HotDebate />
        </div>
        <div className="bg-green-500 w-11/12">
fsfs
        </div>
      </div>
    </div>
    </main>
  );
}