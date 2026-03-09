import { ReviewProfile } from "~/shared/ui/ReviewProfile/ui/ReviewProfile";


export const PublicProfileReviewsTab = () => {
  return (
    <div className="flex flex-col gap-4">
      <ReviewProfile />
      <ReviewProfile />
      <ReviewProfile />
      <ReviewProfile />
      <ReviewProfile />
    </div>
  );
};