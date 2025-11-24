"use client";

import { PlayerInputs } from "@/components/shared/navbar";

interface SidePreviewProps {
  players: PlayerInputs[];
  selectedSide: number[];
}

export function SidePreview({ players, selectedSide }: SidePreviewProps) {
  return (
    <>
      {selectedSide.length === 0 ? (
        <div className="text-red-300 text-center w-full border p-4">No players selected</div>
      ) : (
        <>
          {[...selectedSide].map((playerId, i) => {
            const player = players.find((p) => p.id === playerId);
            if (!player) return null;
            return (
              <div className="border p-2 rounded flex justify-between" key={i}>
                <h1 className="flex-1">{player.playerName}</h1>
                <div className="flex-1 w-full grid grid-cols-3">
                  <h1 className="text-green-300">{player.wins}</h1>
                  <h1 className="text-red-300">{player.totalMatch - player.wins}</h1>
                  <h1>{player.wins}</h1>
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
