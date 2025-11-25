"use client";

import { getWinRate } from "@/lib/func";
import { cn } from "@/lib/utils";
import { MoveRight, Percent } from "lucide-react";
import { PlayerInputs, WinnerType } from "@/types";

interface SidePreviewProps {
  players: PlayerInputs[];
  selectedSide: number[];
  winner?: WinnerType;
  sideLabel: "a" | "b";
}

function getPreviewWinRate(player: PlayerInputs, sideLabel: "a" | "b", winner?: WinnerType) {
  if (!winner) return player.totalMatch === 0 ? 0 : Math.round((player.wins / player.totalMatch) * 100);

  const wins = winner === sideLabel ? player.wins + 1 : player.wins;
  const total = player.totalMatch + 1;

  return Math.round((wins / total) * 100);
}

export function SidePreview({ players, selectedSide, winner, sideLabel }: SidePreviewProps) {
  return (
    <>
      {selectedSide.length === 0 ? (
        <div className="text-red-300 text-center w-full border p-4">No players selected</div>
      ) : (
        <>
          {[...selectedSide].map((playerId, i) => {
            const player = players.find((p) => p.id === playerId);
            if (!player) return null;

            const previewWinRate = getPreviewWinRate(player, sideLabel, winner);

            return (
              <div className={cn("border p-2 rounded flex justify-between", winner && (winner !== sideLabel ? "bg-red-400/10 border-red-200/20" : "bg-green-400/10 border-green-200/20"))} key={i}>
                <h1 className="flex-2">{player.playerName}</h1>
                <div className="flex-3 w-full grid items-center grid-cols-2">
                  <div className="flex items-center gap-0.5">
                    <div className="flex items-center gap-0.5 px-4">
                      <span className="text-green-400">{player.wins}</span>
                      <span>/</span>
                      <span className="text-red-400">{player.totalMatch - player.wins} </span>
                    </div>
                    <h1 className="flex items-center">
                      {getWinRate(player.wins, player.totalMatch)}
                      <Percent className="size-3" />
                    </h1>
                  </div>
                  <div className="flex items-center">
                    {winner ? (
                      <>
                        <MoveRight className="size-4 mr-2 opacity-50" />
                        {winner !== sideLabel ? (
                          <div className="flex items-center gap-0.5 px-4">
                            <span className="text-green-400/50">{player.wins}</span>
                            <span>/</span>
                            <span className="text-red-400 font-bold text-sm">{player.totalMatch - player.wins + 1}</span>
                            <h1 className="pl-4 text-red-400 flex items-center">
                              {previewWinRate}
                              <Percent className="size-3" />
                            </h1>
                          </div>
                        ) : (
                          <div className="flex items-center gap-0.5 px-4">
                            <span className="text-green-400 font-bold text-sm">{player.wins + 1}</span>
                            <span>/</span>
                            <span className="text-red-400/50">{player.totalMatch - player.wins}</span>
                            <h1 className="pl-4 text-green-400 flex items-center">
                              {previewWinRate}
                              <Percent className="size-3" />
                            </h1>
                          </div>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
