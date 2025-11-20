"use client";

import { useStateMachine } from "little-state-machine";

import useHydration from "@/lib/useHydration";

export default function MatchList() {
  const { state } = useStateMachine();
  const isHydrated = useHydration();

  const matches = state.matches;
  const players = state.players;

  return (
    <div className="w-full mx-auto pt-20 px-4 space-y-6">
      {isHydrated && (
        <div className="w-full">
          {matches.length === 0 ? (
            <p className="text-center text-muted-foreground">No matches yet</p>
          ) : (
            <div className="flex flex-col-reverse">
              {matches.map((match, i) => {
                return (
                  <div className="border border-fill rounded p-10 flex flex-col" key={i}>
                    <div className="flex justify-between items-center">
                      <h1>Match #{i + 1}</h1>
                      <div className="py-1 px-2 text-xs border-primary border rounded-full text-primary uppercase">On going</div>
                    </div>
                    <div className="space-y-2 grid grid-cols-2">
                      <div>
                        {match.aSide?.map((playerId, i) => {
                          const player = players.find((p) => p.id === playerId);
                          return (
                            <div key={i}>
                              {player?.playerName} — Total Matches: {player?.totalMatch}, Wins: {player?.wins}
                            </div>
                          );
                        })}
                      </div>
                      <div>
                        {match.bSide?.map((playerId, i) => {
                          const player = players.find((p) => p.id === playerId);
                          return (
                            <div key={i}>
                              {player?.playerName} — Total Matches: {player?.totalMatch}, Wins: {player?.wins}
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-xs text-muted-foreground">Date: {new Date(match.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
