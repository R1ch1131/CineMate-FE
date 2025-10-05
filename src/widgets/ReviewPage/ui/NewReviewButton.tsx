import { Plus } from "lucide-react";
import React from "react";

export const NewReviewButton = () =>{
    return(
        <div className="from-lightorange to-darkorange flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r text-white">
              <Plus className="h-5 w-5" />
              <p>Написать рецензию</p>
        </div>
    )
}