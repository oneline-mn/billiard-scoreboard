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

type MatchStatus = "finished" | "on match";

createStore({
  matches: [],
  players: [],
});

export function addMatch(state: { matches: MatchHistory[]; players: PlayerInputs[] }, payload: { aSide: number[]; bSide: number[] }) {
  const newMatch: MatchHistory = {
    aSide: payload.aSide,
    bSide: payload.bSide,
    createdAt: new Date().toISOString(),
    status: "on match",
  };

  return {
    ...state,
    matches: [...state.matches, newMatch],
  };
}

export default function Page() {
  const { actions, state } = useStateMachine({ actions: { addMatch } });

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
