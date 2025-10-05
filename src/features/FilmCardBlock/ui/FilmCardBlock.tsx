import { Card } from "~/entities/FilmPageCard";
import { cards } from "./model/data";
interface FilmCardBlockProps {
  viewMode: "grid" | "list";
}
export const FilmCardBlock: React.FC<FilmCardBlockProps> = ({ viewMode }) => {
  return (
    <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-4">
      <div
        className={`transition-all duration-300 ${
          viewMode === "grid"
            ? "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            : "flex flex-col space-y-4"
        }`}
      >
        {viewMode === "grid" ? (
          <>
            {cards.map((card) => (
              <Card key={card.id} card={card} viewMode={viewMode} />
            ))}
          </>
        ) : (
          <>
            {cards.map((card) => (
              <div
                key={card.id}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10"
              >
                <Card card={card} viewMode={viewMode} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
