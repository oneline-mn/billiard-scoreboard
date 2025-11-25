"use client";

import { createStore, useStateMachine } from "little-state-machine";
import Image from "next/image";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LEADERS_TROPHY } from "@/lib/constants";
import useHydration from "@/lib/use-hydration";
import { cn } from "@/lib/utils";

import { getWinRate } from "@/lib/func";
import { MatchHistory, PlayerInputs } from "@/types";

createStore({
  matches: [],
  players: [],
});

declare module "little-state-machine" {
  interface GlobalState {
    matches: MatchHistory[];
    players: PlayerInputs[];
  }
}
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

  const sortedPlayers = state.players.sort((a, b) => {
    if (b.wins !== a.wins) {
      return b.wins - a.wins;
    }
    return a.totalMatch - a.wins - (b.totalMatch - b.wins);
  });

  const top3 = sortedPlayers.slice(0, 3);
  const others = sortedPlayers.slice(3);

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4">
      <div className="flex min-h-screen w-full flex-col pt-32 space-y-10">
        {isHydrated && (
          <>
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              {top3.map((leader, index) => {
                return (
                  <Leader className={cn(index === 1 && "mt-10 sm:order-first", index === 2 && "mt-14")} key={index} label={index + 1} player={<h1>{leader.playerName}</h1>} trophy={LEADERS_TROPHY[index].name}>
                    <div className="grid grid-cols-3 gap-4 w-full mt-4  border-t pt-4">
                      <div className="">
                        <h1 className="text-sm text-slate-400 font-medium">WIns</h1>
                        <h1 className="font-semibold">
                          <span className="text-green-300">{leader.wins}</span>
                        </h1>
                      </div>
                      <div>
                        <h1 className="text-sm text-slate-400 font-medium">Losses</h1>
                        <h1 className="font-semibold">
                          <span className="text-red-300">{leader.totalMatch - leader.wins}</span>
                        </h1>
                      </div>
                      <div>
                        <h1 className="text-sm text-slate-400 font-medium">Winrate</h1>
                        <h1 className="font-semibold">
                          <span className="text-slate-300">{getWinRate(leader.wins, leader.totalMatch)}%</span>
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
                        <TableHead className="text-center text-gray-400">W / L</TableHead>
                        <TableHead className="text-center text-gray-400">Total</TableHead>
                        <TableHead className="text-center text-gray-400">Winrate</TableHead>
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
                          <TableCell className="text-center space-x-1">
                            <span className="text-green-400">{player.wins}</span>
                            <span>/</span>
                            <span className="text-red-400">{player.totalMatch - player.wins}</span>
                          </TableCell>
                          <TableCell className="text-center">{player.totalMatch}</TableCell>

                          {/* Winrate */}
                          <TableCell className="text-center flex gap-3 justify-center items-center">
                            <div className="flex relative h-1 w-12 sm:w-32 rounded overflow-hidden">
                              <span className="size-full bg-fill"></span>
                              <span className={cn(`absolute left-0 top-0 bg-primary h-full`)} style={{ width: `${Math.round(player.totalMatch === 0 ? 0 : (player.wins / player.totalMatch) * 100)}%` }}></span>
                            </div>
                            {Math.round(player.totalMatch === 0 ? 0 : (player.wins / player.totalMatch) * 100)}%
                          </TableCell>
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

function Leader({ children, className, label, player, trophy }: LeaderProps) {
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
      label = null;
  }
  return (
    <div className={cn("w-full aspect-2/1 bg-linear-to-t from-background from-30% to-[#171C29] relative px-10", className)}>
      <div className={cn("flex flex-col gap-3 items-center justify-center rounded-md p-2 -mt-10")}>
        <div className="flex items-center gap-3 drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
          <Image alt="trophy" className="size-16 object-contain" height={100} src={`/trophies/${trophy}-cup.png`} width={100} />
        </div>
        <div className="mb-3 font-semibold text-xl">{player}</div>
      </div>
      {children}
    </div>
  );
}
