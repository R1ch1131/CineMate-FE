import { Eye, Star, TrendingUp, Bookmark } from "lucide-react";

export const REVIEW_TABS = [
  {
    name: "Все рецензии",
    icon: <Eye size={18} />,
    id: "all",
    endpoint: "/reviews/all",
  },
 {
    name: "Избранные",
    icon: <Bookmark size={18} />,
    id: "favorites",
    endpoint: "/reviews/favorites",
  },
{
    name: "Мои рецензии",
    icon: <Star size={18} />,
    id: "my",
    endpoint: "/reviews/user",
  },
  {
    name: "Рекомендации",
    icon: <TrendingUp size={18} />,
    id: "recommended",
    endpoint: "/reviews",
  },
] as const;