import React from "react";
import { ExternalLink} from 'lucide-react';

interface LinkButtonProps{
    name: string,
    cost: string,
    color: string
}

export const LinkButton = ({name, cost, color = ""}: LinkButtonProps) => {
    return(
        <div className={`${color} h-18 text-white rounded-2xl `}>
            <div className="flex justify-between items-center p-3.5">
                <div>
                    <p>{name}</p>
                    <p>{cost}</p>
                </div>
                <ExternalLink width={23} />
            </div> 
        </div>
    )
}