import React from "react";
import { TrendTheme } from "~/features/TrendTheme";
import { ActivityFeed } from "~/features/ActivityFeed";
import { ConnectUs } from "~/features/ConnectUs";

export const SideBar = () => {
    return(
        <div className="flex flex-col gap-10">
          <TrendTheme />
          <ActivityFeed />
          <ConnectUs />
        </div>
    )
}