import { Eye, User, Heart, Star, TrendingUp } from "lucide-react";
import type { Review } from "../ui/ReviewCols";
import Film from '~/shared/assets/icons/filmImage.jpg'
import User1 from '~/shared/assets/icons/actor.jpg'

export const REVIEW_TABS = [
  {
    name: "Все рецензии",
    icon: <Eye size={18} />,
    id: "all" as const,
  },
  {
    name: "От подписок",
    icon: <User size={18} />,
    id: "subscriptions" as const,
  },
  {
    name: "Избранные",
    icon: <Heart size={18} />,
    id: "favorites" as const,
  },
  {
    name: "Мои рецензии",
    icon: <Star size={18} />,
    id: "my" as const,
  },
  {
    name: "Рекомендации",
    icon: <TrendingUp size={18} />,
    id: "recommended" as const,
  },
] as const;

export const SUBSCRIPTION_REVIEWS: Review[] = [
 {
    author: "Автор 1",
    film: "Фильм 1",
    rating: 3,
    date: "32",
    likes: 21,
    comments: 3,
    userRole: "Эксперт",
    genres: ["#ski-fi", "#villeneuve"],
    content: "«Дю́на» (англ. Dune), в титрах «Дюна: Часть первая»[5] (англ. Dune: Part One) — американский эпический научно-фантастический фильм 2021 года режиссёра Дени Вильнёва, сценарий для которого написал он сам совместно с Джоном Спэйтсом и Эриком Ротом. Это первая лента в новой серии экранизаций одноимённого романа Фрэнка Герберта 1965 года, часть большой медиафраншизы",
    year: "2024",
    filmImage: Film,
    userImage: User1,
  },
  {
    author: "Автор 1",
    film: "Фильм 2",
    rating: 3,
    date: "32",
    likes: 21,
    comments: 3,
    userRole: "Эксперт",
    genres: ["#ski-fi", "#villeneuve"],
    content: "«Дю́на» (англ. Dune), в титрах «Дюна: Часть первая»[5] (англ. Dune: Part One) — американский эпический научно-фантастический фильм 2021 года режиссёра Дени Вильнёва, сценарий для которого написал он сам совместно с Джоном Спэйтсом и Эриком Ротом. Это первая лента в новой серии экранизаций одноимённого романа Фрэнка Герберта 1965 года, часть большой медиафраншизы",
    year: "2024",
    filmImage: Film,
    userImage: User1,
  },
];

export const FAVORITE_REVIEWS: Review[] = [
 {
    author: "Автор 2",
    film: "Фильм 1",
    rating: 3,
    date: "32",
    likes: 21,
    comments: 3,
    userRole: "Эксперт",
    genres: ["#ski-fi", "#villeneuve"],
    content: "«Дю́на» (англ. Dune), в титрах «Дюна: Часть первая»[5] (англ. Dune: Part One) — американский эпический научно-фантастический фильм 2021 года режиссёра Дени Вильнёва, сценарий для которого написал он сам совместно с Джоном Спэйтсом и Эриком Ротом. Это первая лента в новой серии экранизаций одноимённого романа Фрэнка Герберта 1965 года, часть большой медиафраншизы",
    year: "2024",
    filmImage: Film,
    userImage: User1,
  },
  {
    author: "Автор 2",
    film: "Фильм 1",
    rating: 3,
    date: "32",
    likes: 21,
    comments: 3,
    userRole: "Эксперт",
    genres: ["#ski-fi", "#villeneuve"],
    content: "«Дю́на» (англ. Dune), в титрах «Дюна: Часть первая»[5] (англ. Dune: Part One) — американский эпический научно-фантастический фильм 2021 года режиссёра Дени Вильнёва, сценарий для которого написал он сам совместно с Джоном Спэйтсом и Эриком Ротом. Это первая лента в новой серии экранизаций одноимённого романа Фрэнка Герберта 1965 года, часть большой медиафраншизы",
    year: "2024",
    filmImage: Film,
    userImage: User1,
  },
  {
    author: "Автор 2",
    film: "Фильм 1",
    rating: 3,
    date: "32",
    likes: 21,
    comments: 3,
    userRole: "Эксперт",
    genres: ["#ski-fi", "#villeneuve"],
    content: "«Дю́на» (англ. Dune), в титрах «Дюна: Часть первая»[5] (англ. Dune: Part One) — американский эпический научно-фантастический фильм 2021 года режиссёра Дени Вильнёва, сценарий для которого написал он сам совместно с Джоном Спэйтсом и Эриком Ротом. Это первая лента в новой серии экранизаций одноимённого романа Фрэнка Герберта 1965 года, часть большой медиафраншизы",
    year: "2024",
    filmImage: Film,
    userImage: User1,
  },
];

export const MY_REVIEWS: Review[] = [
 {
    author: "Автор 3",
    film: "Фильм 1",
    rating: 3,
    date: "32",
    likes: 21,
    comments: 3,
    userRole: "Эксперт",
    genres: ["#ski-fi", "#villeneuve"],
    content: "«Дю́на» (англ. Dune), в титрах «Дюна: Часть первая»[5] (англ. Dune: Part One) — американский эпический научно-фантастический фильм 2021 года режиссёра Дени Вильнёва, сценарий для которого написал он сам совместно с Джоном Спэйтсом и Эриком Ротом. Это первая лента в новой серии экранизаций одноимённого романа Фрэнка Герберта 1965 года, часть большой медиафраншизы",
    year: "2024",
    filmImage: Film,
    userImage: User1,
  },
  {
    author: "Автор 3",
    film: "Фильм 1",
    rating: 3,
    date: "32",
    likes: 21,
    comments: 3,
    userRole: "Эксперт",
    genres: ["#ski-fi", "#villeneuve"],
    content: "«Дю́на» (англ. Dune), в титрах «Дюна: Часть первая»[5] (англ. Dune: Part One) — американский эпический научно-фантастический фильм 2021 года режиссёра Дени Вильнёва, сценарий для которого написал он сам совместно с Джоном Спэйтсом и Эриком Ротом. Это первая лента в новой серии экранизаций одноимённого романа Фрэнка Герберта 1965 года, часть большой медиафраншизы",
    year: "2024",
    filmImage: Film,
    userImage: User1,
  },
  {
    author: "Автор 3",
    film: "Фильм 1",
    rating: 3,
    date: "32",
    likes: 21,
    comments: 3,
    userRole: "Эксперт",
    genres: ["#ski-fi", "#villeneuve"],
    content: "«Дю́на» (англ. Dune), в титрах «Дюна: Часть первая»[5] (англ. Dune: Part One) — американский эпический научно-фантастический фильм 2021 года режиссёра Дени Вильнёва, сценарий для которого написал он сам совместно с Джоном Спэйтсом и Эриком Ротом. Это первая лента в новой серии экранизаций одноимённого романа Фрэнка Герберта 1965 года, часть большой медиафраншизы",
    year: "2024",
    filmImage: Film,
    userImage: User1,
  },
];

export const RECOMMENDED_REVIEWS: Review[] = [
  {
    author: "Автор 4",
    film: "Фильм 1",
    rating: 3,
    date: "32",
    likes: 21,
    comments: 3,
    userRole: "Эксперт",
    genres: ["#ski-fi", "#villeneuve"],
    content: "«Дю́на» (англ. Dune), в титрах «Дюна: Часть первая»[5] (англ. Dune: Part One) — американский эпический научно-фантастический фильм 2021 года режиссёра Дени Вильнёва, сценарий для которого написал он сам совместно с Джоном Спэйтсом и Эриком Ротом. Это первая лента в новой серии экранизаций одноимённого романа Фрэнка Герберта 1965 года, часть большой медиафраншизы",
    year: "2024",
    filmImage: Film,
    userImage: User1,
  },
  {
    author: "Автор 4",
    film: "Фильм 1",
    rating: 3,
    date: "32",
    likes: 21,
    comments: 3,
    userRole: "Эксперт",
    genres: ["#ski-fi", "#villeneuve"],
    content: "«Дю́на» (англ. Dune), в титрах «Дюна: Часть первая»[5] (англ. Dune: Part One) — американский эпический научно-фантастический фильм 2021 года режиссёра Дени Вильнёва, сценарий для которого написал он сам совместно с Джоном Спэйтсом и Эриком Ротом. Это первая лента в новой серии экранизаций одноимённого романа Фрэнка Герберта 1965 года, часть большой медиафраншизы",
    year: "2024",
    filmImage: Film,
    userImage: User1,
  },
];

export const ALL_REVIEWS: Review[] = [
  ...SUBSCRIPTION_REVIEWS,
  ...FAVORITE_REVIEWS,
  ...MY_REVIEWS,
  ...RECOMMENDED_REVIEWS,
];

export const TAB_DATA: Review[][] = [
  ALL_REVIEWS,
  SUBSCRIPTION_REVIEWS,
  FAVORITE_REVIEWS,
  MY_REVIEWS,
  RECOMMENDED_REVIEWS,
];
