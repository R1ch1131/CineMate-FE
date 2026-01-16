import React from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  Dot,
  LucideThumbsUp,
  MessageCircle,
  Send,
  Undo2,
} from "lucide-react";
import { Field, Textarea } from "@headlessui/react";
import clsx from "clsx";

interface Comment {
  id: number;
  author: string;
  date: string;
  text: string;
  likeCount: string;
}

interface CommentSectionProps {
  userImage: StaticImageData | string;
  comments: Comment[];
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  userImage,
  comments,
}) => {
  return (
    <div className="mt-6">
      <div className="border-frostedglass mb-4 w-full border-t" />
      <div className="flex items-center gap-2">
        <MessageCircle width={17} className="text-grey" />
        <p className="font-semibold text-white">
          Комментарии ({comments.length})
        </p>
      </div>
      <div className="mt-4 space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-frostedglass grid grid-cols-12 gap-4 rounded-2xl p-3"
          >
            <div className="col-span-1">
              <Image
                className="h-10 w-10 rounded-full object-cover"
                src={userImage}
                alt={comment.author}
              />
            </div>
            <div className="col-span-11">
              <div className="flex items-center">
                <Link href={"/profile"}>
                  <p className="hover:text-lightorange font-semibold text-white">
                    {comment.author}
                  </p>
                </Link>
                <Dot className="text-grey" />
                <p className="text-grey text-sm">{comment.date}</p>
              </div>
              <p className="mt-1 text-gray-300">{comment.text}</p>
              <div className="flex gap-2 pt-1 text-sm">
                <button className="center flex gap-1 hover:text-red-400">
                  <LucideThumbsUp width={14} /> {comment.likeCount}
                </button>
                <button className="center flex gap-0.5 hover:text-orange-300">
                  <Undo2 width={14} />
                  Ответить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-frostedglass mt-4 mb-1 w-full border-t" />
      <div className="flex gap-4">
        <div className="pt-3">
          <Image
            className="h-10 w-10 rounded-full object-cover"
            src={userImage}
            alt="sdf"
          />
        </div>
        <div className="w-full">
          <Field>
            <Textarea
              placeholder="Напишите комментарий..."
              className={clsx(
                "bg-frostedglass mt-3 block w-full resize-none rounded-lg border-none px-3 py-1.5 text-sm/6 text-white",
                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-amber-600",
              )}
              rows={4}
            />
          </Field>
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <button className="center flex h-9 w-33 gap-2 rounded-xl bg-gradient">
          <Send width={17} /> Отправить
        </button>
      </div>
    </div>
  );
};
