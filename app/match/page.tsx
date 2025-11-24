"use client";

import { createStore, useStateMachine } from "little-state-machine";
import { Plus } from "lucide-react";

import { PlayerInputs } from "@/components/shared/navbar";
import { showToast } from "@/components/shared/use-toast";
import { Button } from "@/components/ui/button";

import MatchList from "./components/match-list";
import { MatchModal } from "./components/match-modal";

export interface MatchHistory {
  aSide: number[];
  bSide: number[];
  createdAt: string;
  status: MatchStatus;
}

export type MatchStatus = "finished" | "on match";

createStore({
  matches: [],
  players: [],
});

export function addMatch(state: { matches: MatchHistory[]; players: PlayerInputs[] }, payload: { aSide: number[]; bSide: number[]; winnerSide?: "a" | "b" }) {
  const newMatch: MatchHistory = {
    aSide: payload.aSide,
    bSide: payload.bSide,
    createdAt: new Date().toISOString(),
    status: payload.winnerSide ? "finished" : "on match",
  };

  const updatedPlayers = payload.winnerSide
    ? state.players.map((p) => {
        const isWinner = payload.winnerSide === "a" ? payload.aSide.includes(p.id) : payload.bSide.includes(p.id);
        const isLoser = payload.aSide.includes(p.id) || payload.bSide.includes(p.id);

        return isWinner ? { ...p, totalMatch: p.totalMatch + 1, wins: p.wins + 1 } : isLoser ? { ...p, totalMatch: p.totalMatch + 1 } : p;
      })
    : state.players;

  return {
    ...state,
    matches: [...state.matches, newMatch],
    players: updatedPlayers,
  };
}

export default function Page() {
  const { actions, state } = useStateMachine({ actions: { addMatch, updateMatchList } });

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex w-full flex-col items-center pt-20 space-y-4">
        <MatchModal
          onSubmit={(payload) => {
            actions.addMatch(payload);
            showToast("success", "Match saved!");
          }}
          players={state.players}
          trigger={
            <Button className="rounded-full flex items-center gap-2">
              <Plus strokeWidth={3} />
              New Match
            </Button>
          }
        />
        <MatchList />
      </div>
    </div>
  );
}

export function updateMatchList(state: { matches: MatchHistory[]; players: PlayerInputs[] }, payload: { matchIndex: number; updatedMatch: MatchHistory; updatedPlayers?: PlayerInputs[] }) {
  const newMatches = [...state.matches];
  newMatches[payload.matchIndex] = payload.updatedMatch;

  return {
    ...state,
    matches: newMatches,
    players: payload.updatedPlayers || state.players,
  };
}
