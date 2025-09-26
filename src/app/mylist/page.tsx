import React from "react";
import { UnauthorizedMyList } from "~/features/UnauthorizedMyList";

export default function HomePage() {
  return (
    <div className="flex justify-center pt-60 2k:pt-96 items-center h-full">
      <UnauthorizedMyList />
    </div>
  );
}