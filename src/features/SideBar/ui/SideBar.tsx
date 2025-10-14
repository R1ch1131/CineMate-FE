import React from "react";
import { NewFilm } from "~/features/NewFIlm";
import { ActivityFeed } from "~/features/ActivityFeed";
import { ConnectUs } from "~/features/ConnectUs";

export const SideBar = () => {
    return(
        <div className="flex flex-col gap-10">
          <NewFilm />
          <ActivityFeed />
          <ConnectUs />
        </div>
    )
}