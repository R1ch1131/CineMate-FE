"use client";
import { Heart, MessageCircle, Star } from "lucide-react";
import filmImage from "~/shared/assets/icons/filmImage.jpg";
import Image from "next/image";

export const UsersProfileReviewsTab = () => {
  const userReviews = [
    {
      id: 1,
      title: "Дюна: Часть вторая",
      review:
        "Невероятное визуальное зрелище! Дени Вильнёв создал настоящий шедевр. Каждый кадр продуман до мелочей, а музыка Ханса Циммера просто завораживает. Особенно впечатлили сцены с песчаными червями - они выглядят настолько реалистично, что дух захватывает.",
      image: filmImage,
      userRating: "9",
      timeAgo: "2 дня назад",
      likes: 24,
      comments: 8,
    },
    {
      id: 2,
      title: "Интерстеллар",
      review:
        "Фильм, который заставляет задуматься о нашем месте во Вселенной. Нолан мастерски сочетает научную фантастику с человеческими эмоциями. Сцена с червоточиной и гравитацией - это просто космос!",
      image: filmImage,
      userRating: "10",
      timeAgo: "1 неделю назад",
      likes: 156,
      comments: 23,
    },
    {
      id: 3,
      title: "Бегущий по лезвию 2049",
      review:
        "Продолжение получилось достойным оригиналу. Райан Гослинг отлично вписался в атмосферу фильма. Визуал просто потрясающий - каждый кадр как произведение искусства.",
      image: filmImage,
      userRating: "8",
      timeAgo: "3 недели назад",
      likes: 89,
      comments: 15,
    },
  ];

  return (
    <div className="pt-3">
      <div className="flex flex-col gap-3">
        <div className="flex w-full flex-wrap items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Рецензии пользователя
          </h2>
          {/* заменить на переменные */}
          <span className="text-gray-400">3 из 42</span>
        </div>
        <div className="space-y-4">
          {userReviews.map((review) => (
            <div
              key={review.id}
              className="group flex items-start space-x-4 rounded-2xl bg-white/5 p-4 backdrop-blur-sm transition-all hover:bg-white/10"
            >
              <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={review.image}
                  alt={review.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col gap-3">
                <div className="flex items-start justify-between">

                    <h3 className="text-xl font-bold text-white transition-colors group-hover:text-amber-400">
                      {review.title}
                    </h3>

                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-current text-amber-500" />
                    <span className="font-semibold text-amber-500">
                      {review.userRating}/10
                    </span>
                  </div>
                </div>

                <p className="line-clamp-3 text-sm text-gray-300">
                  {review.review}
                </p>

                <div className="flex w-full items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{review.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{review.comments}</span>
                    </div>
                  </div>
                  <span>{review.timeAgo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
