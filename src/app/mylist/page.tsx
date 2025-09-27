import React from "react";
import { UnauthorizedMyList } from "~/features/UnauthorizedMyList";

export default function HomePage() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-200px)]">
      <UnauthorizedMyList />
    </div>
  );
}