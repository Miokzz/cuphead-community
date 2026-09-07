"use client";

import { usePathname } from "next/navigation";
import { RetroPropScene, type RetroSceneVariant } from "./RetroPropScene";

export function AppWorld3D(){
  const path=usePathname();
  let variant: RetroSceneVariant = "dice";
  let label = "INKSIDE PROPS";
  if(path.startsWith("/leaderboards")){variant="casino";label="HIGH SCORE CLUB";}
  else if(path.startsWith("/achievements")){variant="cabinet";label="TROPHY CABINET";}
  else if(path.startsWith("/challenges")){variant="desk";label="CONTRACT DESK";}
  else if(path.startsWith("/messages")){variant="radio";label="ON THE AIR";}
  else if(path.startsWith("/communities")||path.startsWith("/community")){variant="island";label="INKSIDE MAP";}
  return <div className={`app-world-3d world-${variant}`}><span>{label}</span><RetroPropScene variant={variant}/></div>;
}