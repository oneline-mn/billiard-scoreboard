"use client";

import { createStore, useStateMachine } from "little-state-machine";
import { Star } from "lucide-react";
import Image from "next/image";
import { useSyncExternalStore } from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

createStore({ players: [] });

const LEADERS_TROPHY = [
  {
    name: "gold",
  },
  {
    name: "silver",
  },
  {
    name: "bronze",
  },
];

interface LeaderProps {
  children?: React.ReactNode;
  className?: React.ReactNode;
  label?: React.ReactNode;
  player: React.ReactNode;
  trophy?: string;
}

export default function Home() {
  const { state } = useStateMachine();
  const isHydrated = useHydration();

  const sortedPlayers = [...state.players].sort((a, b) => b.wins - a.wins);
  const top3 = sortedPlayers.slice(0, 3);
  const others = sortedPlayers.slice(3);

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4">
      <div className="flex min-h-screen w-full flex-col pt-32 space-y-4">
        {isHydrated && (
          <>
            <div className="grid grid-cols-3 gap-8">
              {top3.map((leader, index) => {
                return (
                  <Leader
                    className={cn(index === 1 && "mt-10 order-first", index === 2 && "mt-14")}
                    key={index}
                    label={index + 1}
                    player={
                      <h1>
                        {leader.playerName}
                        <span className="text-gray-600"> #0{leader.id}</span>
                      </h1>
                    }
                    trophy={LEADERS_TROPHY[index].name}
                  >
                    <div className="flex items-center gap-1 mt-4">
                      <Star className="fill-yellow-300 text-yellow-300 size-4" />
                      <h1 className="font-bold text-xl">{leader.wins}</h1>
                    </div>
                    <div className="grid grid-cols-2 w-full mt-12 text-center">
                      <div>
                        <h1 className="text-sm text-slate-400 font-medium">Match stats</h1>
                        <h1 className="font-medium">
                          <span className="text-green-300">{leader.wins}</span> - <span className="text-red-300">{leader.totalMatch - leader.wins}</span>
                        </h1>
                      </div>
                      <div>
                        <h1 className="text-sm text-slate-400 font-medium">Winrate</h1>
                        <h1 className="font-medium">
                          <span>{leader.totalMatch === 0 ? 0 : Math.round((leader.wins / leader.totalMatch) * 100)}</span>%
                        </h1>
                      </div>
                    </div>
                  </Leader>
                );
              })}
            </div>
            <div className="bg-linear-to-r w-full h-1 from-background from-10% via-50% to-90% via-slate-700/50 to-background mb-10"></div>
            <div className="border rounded-xl">
              <div>
                {others.length === 0 ? (
                  <Table className="rounded-none!">
                    <TableBody>
                      <TableRow>
                        <TableCell className="text-center text-muted-foreground py-20" colSpan={3}>
                          No players yet
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                ) : (
                  <Table className="relative bg-[#13161e] rounded-xl">
                    <TableHeader className="sticky top">
                      <TableRow className="text-red-500 font-medium">
                        <TableHead className="w-[100px] text-gray-400">#</TableHead>
                        <TableHead className="text-gray-400">Player Name</TableHead>
                        <TableHead className="text-center text-gray-400">Total</TableHead>
                        <TableHead className="text-center text-gray-400">Winrate</TableHead>
                        <TableHead className="text-center text-gray-400">Win</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {others.map((player, index) => (
                        <TableRow className="font-medium text-gray-500" key={index}>
                          <TableCell className="text-semibold">{index + 4}</TableCell>
                          <TableCell className="text-semibold text-white">
                            {player.playerName}
                            <span className="text-gray-600"> #0{player.id}</span>
                          </TableCell>
                          <TableCell className="text-center">{player.totalMatch}</TableCell>
                          <TableCell className="text-center">{Math.round(player.totalMatch === 0 ? 0 : (player.wins / player.totalMatch) * 100)}%</TableCell>
                          <TableCell className="text-center">{player.wins}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function useHydration() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

const Leader: React.FC<LeaderProps> = ({ children, className, label, player, trophy }) => {
  switch (label) {
    case 1:
      label = "1st";
      break;
    case 2:
      label = "2nd";
      break;
    case 3:
      label = "3rd";
      break;
    default:
  }

  return (
    <div className={cn("w-full aspect-square bg-linear-to-t from-background from-30% to-[#171C29] relative", className)}>
      <span className="absolute top-[35%] left-[50%] -translate-[50%] text-6xl font-black opacity-40 text-fill">{label}</span>
      <div className="absolute -top-[20%] left-[50%] -translate-x-[50%] flex flex-col items-center space-y- w-full px-6">
        <div className="mb-3 font-semibold text-lg">{player}</div>
        <div className={cn("size-12 flex items-center justify-center rounded-md p-2 bg-gray-700")}>
          <Image alt="trophy" height={70} src={`/trophies/crown.png`} width={70} />
        </div>
        {children}
      </div>
    </div>
  );
};
