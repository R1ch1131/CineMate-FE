import { Eye, Star, TrendingUp, Bookmark } from "lucide-react";

export const REVIEW_TABS = [
  {
    name: "Все рецензии",
    icon: <Eye size={18} />,
    id: "all",
    endpoint: "/api/reviews", 
  },
 {
    name: "Избранные",
    icon: <Bookmark size={18} />,
    id: "favorites",
    endpoint: "/api/reviews/favorites", 
  },
{
    name: "Мои рецензии",
    icon: <Star size={18} />,
    id: "my",
    endpoint: "/api/reviews/user", 
  },
  {
    name: "Рекомендации",
    icon: <TrendingUp size={18} />,
    id: "recommended",
    endpoint: "/api/reviews", //чет придумать с реками
  },
] as const;