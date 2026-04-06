"use client";

import React, { useState, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { useSession } from "next-auth/react";
import { Dot, LucideThumbsUp, Send, Undo2, X, ChevronDown, ChevronUp } from "lucide-react";
import { Field, Textarea } from "@headlessui/react";
import clsx from "clsx";

interface Comment {
  id: string;
  userName: string;
  content: string;
  likesCount: number;
  createdAt: string;
  replies?: Comment[];
}

interface CommentSectionProps {
  reviewId: string;
  userImage: StaticImageData | string;
  comments: Comment[];
  isLoading: boolean;
  onCommentSent: () => void;
}

// Вспомогательный компонент для одного комментария с логикой сворачивания
type UserImageType = StaticImageData | string;

const CommentItem = ({ 
  comment, 
  userImage, 
  onReply, 
  isReply = false 
}: { 
  comment: Comment; 
  // 2. Заменяем any на корректный союзный тип
  userImage: UserImageType; 
  onReply: (id: string, name: string) => void;
  isReply?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div className={clsx("flex flex-col gap-2", isReply && "ml-10 mt-2")}>
      <div className="flex gap-4 p-3 bg-white/5 rounded-2xl border border-white/5 transition-colors hover:bg-white/[0.07]">
        <div className="h-10 w-10 rounded-full overflow-hidden shrink-0 border border-white/10">
          <Image src={userImage} alt="avatar" width={40} height={40} className="object-cover" />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center text-sm">
            <span className="font-bold text-white">{comment.userName}</span>
            <Dot className="text-grey" />
            <span className="text-grey text-xs">
              {new Date(comment.createdAt).toLocaleDateString("ru-RU")}
            </span>
          </div>
          <p className="text-gray-300 mt-1 text-sm leading-relaxed">{comment.content}</p>
          <div className="flex gap-4 mt-3 text-grey text-xs">
            <button className="flex items-center gap-1.5 hover:text-red-400 transition-colors">
              <LucideThumbsUp size={14} /> 
              <span>{comment.likesCount}</span>
            </button>
            <button 
              onClick={() => onReply(comment.id, comment.userName)}
              className="flex items-center gap-1.5 hover:text-amber-500 transition-colors"
            >
              <Undo2 size={14} /> 
              <span>Ответить</span>
            </button>
            
            {hasReplies && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 text-amber-500/80 hover:text-amber-500 transition-colors font-medium ml-auto"
              >
                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                {isExpanded ? "Скрыть ответы" : `Показать ответы (${comment.replies?.length})`}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Отрисовка вложенных ответов только если развернуто */}
      {hasReplies && isExpanded && (
        <div className="animate-in slide-in-from-top-2 duration-300">
          {comment.replies!.map((reply) => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              userImage={userImage} 
              onReply={onReply} 
              isReply={true} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const CommentSection: React.FC<CommentSectionProps> = ({ 
  reviewId, 
  userImage, 
  comments, 
  isLoading, 
  onCommentSent 
}) => {
  const { data: session } = useSession();
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [replyTo, setReplyTo] = useState<{ id: string; name: string } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if (!text.trim() || isSending) return;
    setIsSending(true);
    try {
      const res = await fetch(`/api/reviews/${reviewId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
          ...(session?.user?.accessToken && { "Authorization": `Bearer ${session.user.accessToken}` }),
        },
        body: JSON.stringify({ 
          content: text, 
          parentId: replyTo ? replyTo.id : null 
        }),
      });

      if (res.ok) {
        setText("");
        setReplyTo(null);
        onCommentSent();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  const startReply = (id: string, name: string) => {
    setReplyTo({ id, name });
    textareaRef.current?.focus();
    textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="mt-6 space-y-6 animate-in fade-in duration-500">
      <div className="border-frostedglass w-full border-t" />
      
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-4"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600" /></div>
        ) : comments && comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem 
              key={comment.id} 
              comment={comment} 
              userImage={userImage} 
              onReply={startReply} 
            />
          ))
        ) : (
          <p className="text-grey text-center text-sm italic py-4">Комментариев пока нет</p>
        )}
      </div>

      {/* Поле ввода */}
      <div className="flex gap-4 mt-8 items-start relative">
        <Image className="h-10 w-10 rounded-full object-cover border border-white/10" src={userImage} alt="me" width={40} height={40} />
        <div className="w-full space-y-2">
          {replyTo && (
            <div className="flex items-center justify-between bg-amber-600/10 border border-amber-600/20 px-3 py-1.5 rounded-lg text-xs animate-in slide-in-from-left-2">
              <p className="text-amber-500">
                Ответ пользователю <span className="font-bold">{replyTo.name}</span>
              </p>
              <button onClick={() => setReplyTo(null)} className="text-grey hover:text-white">
                <X size={14} />
              </button>
            </div>
          )}
          
          <Field>
            <Textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={replyTo ? "Напишите ответ..." : "Напишите что-нибудь..."}
              className={clsx(
                "bg-white/5 block w-full resize-none rounded-xl border border-white/10 px-4 py-3 text-sm text-white transition-all focus:outline-none focus:border-amber-600/50 focus:bg-white/8",
                isSending && "opacity-50 pointer-events-none"
              )}
              rows={2}
            />
          </Field>
          <div className="flex justify-end">
            <button 
              onClick={handleSend}
              disabled={!text.trim() || isSending || !session}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-600 text-white text-sm font-bold hover:bg-amber-500 disabled:bg-white/5 disabled:text-grey transition-all shadow-lg shadow-amber-900/10"
            >
              {isSending ? "Отправка..." : <><Send size={16} /> Отправить</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};