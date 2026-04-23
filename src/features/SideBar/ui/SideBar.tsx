'use client'

import React from "react";
import { NewFilm } from "~/features/NewFIlm";
// import { ActivityFeed } from "~/features/ActivityFeed";
import { ConnectUs } from "~/features/ConnectUs";
import { useSession } from "next-auth/react";

export const SideBar = () => {

    const session = useSession();

    return(
        <div className="flex flex-col gap-10">
          <NewFilm />
          {/* <ActivityFeed /> */}
          {session?.data ?  <div/> : <ConnectUs />}
          
        </div>
    )
}