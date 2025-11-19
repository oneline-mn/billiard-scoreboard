
import {
  ChartNoAxesColumn,
  HandFist,
  Component,
  ScreenShare,
} from "lucide-react";

export const LEADERS_TROPHY = [
  { name: "gold" },
  { name: "silver" },
  { name: "bronze" },
] as const;



export const NAV_LIST = [
  {
    name: "leaderboard",
    url: "/",
    icon: <ChartNoAxesColumn strokeWidth={4} />,
  },
  {
    name: "match",
    url: "/match",
    icon: <HandFist strokeWidth={3} />,
  },
] as const;

export const DEVNAV_LIST = [
  {
    name: "design system",
    url: "/design-system",
    icon: <Component />,
  },
  {
    name: "preview",
    url: "https://billboard.dulmandakh-bce.workers.dev/",
    icon: <ScreenShare />,
  },
] as const;

