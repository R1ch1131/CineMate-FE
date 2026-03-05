import {
  Clock10,
  Flame,
  Send,
  UserRound,
} from "lucide-react";
import React, { useState } from "react";
import { Popup } from "../../../shared/ui/Popup/Popup";
import { Field, Textarea } from "@headlessui/react";
import clsx from "clsx";
import { Debate } from "./Debate";

export const HotDebate = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const maxChars = 1000;

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    if (text.length <= maxChars) {
      setReviewText(text);
    }
  };

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <main>
      <div className="bg-glass border-frostedglass cursor-pointer rounded-2xl border p-6">
        <div>
          <span className="flex gap-2 pb-3">
            <Flame className="text-red-500" />
            <p className="text-white">Горячие обсуждения</p>
          </span>
          <div
            onClick={handleButtonClick}
            className="bg-frostedglass/70 hover:bg-frostedglass rounded-xl p-3"
          >
            <p className="text-white">Спор о Дюна: часть вторая</p>

            <span className="text-grey flex gap-4">
              <p>47 участников</p>
              <p>156 сообщений</p>
            </span>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
          <div className="flex h-[730px] w-[800px] flex-col">
            <header className="flex h-40 w-full items-center gap-4 rounded-t-2xl bg-gradient-to-r from-orange-500/10 to-red-500/10 pl-6">
              <div className="flex h-10 w-10 center rounded-2xl bg-gradient-to-r from-orange-500 to-red-500">
                <Flame className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-bold">Спор о Дюна: Часть вторая</p>
                  <div className="center flex rounded-lg bg-blue-500/30 px-2 py-0.5 text-blue-300">
                    <p>О фильме</p>
                  </div>
                </div>
                <p>
                  Обсуждаем, стоил ли фильм ожидания и оправдал ли надежды
                  фанатов книги
                </p>
                <div className="flex gap-3">
                  <div className="flex gap-1">
                    <UserRound />
                    <p>46 участников</p>
                  </div>
                  <div className="flex gap-1">
                    <Clock10 />
                    <p>Последняя активность: 534 дн назад</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="bg-frostedglass rounded-xl px-2 py-0.5">
                    #sci-fi
                  </div>
                  <div className="bg-frostedglass rounded-xl px-2 py-0.5">
                    #adaptation
                  </div>
                  <div className="bg-frostedglass rounded-xl px-2 py-0.5">
                    #villeneuve
                  </div>
                </div>
              </div>
            </header>
            <div className="flex flex-col gap-4 flex-1 overflow-y-auto p-4">
              <Debate />
              <Debate />
              <Debate />
              <Debate />
              <Debate />
            </div>
            <footer className="bg-glass">
              <div className="border-frostedglass w-full border-t" />
              <div className="flex">
                <div className="w-7/9 px-5 pb-5">
                  <Field>
                    <Textarea
                      value={reviewText}
                      onChange={handleTextChange}
                      placeholder="Поделитесь своими впечатлениями о фильме..."
                      className={clsx(
                        "bg-frostedglass mt-3 block w-full resize-none rounded-lg border-none px-3 py-1.5 text-sm/6 text-white",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-amber-600",
                      )}
                      rows={4}
                    />
                  </Field>
                </div>
                <div className="pt-18">
                  <button className="center bg-gradient flex h-12 w-40 gap-2 rounded-xl">
                    <Send />
                    Опубликовать
                  </button>
                </div>
              </div>
            </footer>
          </div>
        </Popup>
      )}
    </main>
  );
};
