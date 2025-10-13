"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { UnauthorizedMyList } from "~/features/UnauthorizedMyList";
import { MyList } from "~/widgets/MyList";

export default function HomePage() {
  const session = useSession();

  return <div>{session?.data ?  <MyList /> :<UnauthorizedMyList />}</div>;
}
