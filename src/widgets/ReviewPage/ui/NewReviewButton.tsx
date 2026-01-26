import { Check, Film, Plus, TriangleAlert } from "lucide-react";
import React, { useState } from "react";
import { Popup } from "../../../shared/ui/Popup/Popup";
import {
  Checkbox,
  Field,
  Label,
  Textarea,
} from "@headlessui/react";
import clsx from "clsx";
import { Input } from "@headlessui/react";
import { StarRating } from "./StarRating";

export const NewReviewButton = () => {
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

  const [enabled, setEnabled] = useState(true);

  const [input, setInput] = useState("");
  const [items, setItems] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setItems([input, ...items]);
    setInput("");
  };

  return (
    <div>
      <div
        className="from-lightorange to-darkorange flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r text-white"
        onClick={handleButtonClick}
      >
        <Plus className="h-5 w-5" />
        <p>Написать рецензию</p>
      </div>
      {isPopupOpen && (
        <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
          <div className="w-[800px]">
            <div className="flex h-20 w-full items-center gap-4 rounded-t-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 pl-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600">
                <Film className="h-5 w-5 text-white" />
              </div>
              <div>
                <p>Написать рецензию</p>
                <p>Поделитесь своими впечатлениями о фильме</p>
              </div>
            </div>
            <div className="p-6">
              <p>Выберите фильм </p>
              <Field>
                <Input
                  placeholder="Поиск фильма..."
                  className={clsx(
                    "mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-amber-600",
                  )}
                />
              </Field>
            </div>
            <div className="px-6">
              <StarRating />
            </div>
            <div className="p-6">
              <p>Ваша рецензия</p>

              <Field className="relative w-full">
                <Textarea
                  value={reviewText}
                  onChange={handleTextChange}
                  placeholder="Поделитесь своими впечатлениями о фильме..."
                  className={clsx(
                    "bg-frostedglass mt-3 block w-full resize-none rounded-lg border-none px-3 py-1.5 text-sm/6 text-white",
                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-amber-600",
                  )}
                  rows={5}
                />
              </Field>
              <div className="flex justify-between pt-2 text-xs text-gray-400">
                <p className="text-sm">
                  Расскажите, что вам понравилось или не понравилось
                </p>
                {reviewText.length}/{maxChars}
              </div>
              <div className="flex gap-2 py-5">
                <Field className="flex items-center gap-2">
                  <Checkbox
                    checked={enabled}
                    onChange={setEnabled}
                    className="group size-6 rounded-sm bg-white/10 p-1 ring-1 ring-white/15 ring-inset focus:not-data-focus:outline-none data-checked:bg-purple-500 data-focus:outline data-focus:outline-offset-2 data-focus:outline-white"
                  >
                    <Check
                      color="black"
                      className="hidden size-4 group-data-checked:block"
                    />
                  </Checkbox>
                  <TriangleAlert className="h-5 w-5 text-gray-400" />
                  <Label className="text-sm">Рецензия содержит спойлеры</Label>
                </Field>
              </div>
              <div>
                <p>Теги(необязательно)</p>
                <div className="mb-2 mt-2 flex flex-wrap gap-2">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 rounded-full bg-amber-600/20 text-yellow-500 px-2 py-1 text-sm"
                    >
                      #{item}
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSubmit}>
                  <Field>
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Добавьте тег и нажмите Enter"
                      className={clsx(
                        "mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-amber-600",
                      )}
                    />
                  </Field>
                </form>
              </div>
            </div>
            <div className="rounded-b-2xl bg-glass">
              <div className="border-frostedglass mt-4 mb-1 w-full border-t" />
              <div className="flex items-center justify-between p-4">
                <p className=" text-sm">
                  После публикации рецензия будет видна всем пользователям
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleClosePopup}
                    className="rounded-xl bg-frostedglass px-3.5 py-3 hover:bg-grey/40"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient px-3.5 py-3"
                  >
                    Опубликовать
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};
