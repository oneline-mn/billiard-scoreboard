"use client";

import { createStore, useStateMachine } from "little-state-machine";

import { PlayerInputs } from "@/components/shared/navbar";
import { showToast } from "@/components/shared/use-toast";
import { Button } from "@/components/ui/button";

import MatchList from "./components/match-list";
import { MatchModal } from "./components/match-modal";

export interface MatchHistory {
  aSide: number[];
  bSide: number[];
  createdAt: string;
  status: string;
}

createStore({
  matches: [],
  players: [],
});

export function addMatch(state: { matches: MatchHistory[]; players: PlayerInputs[] }, payload: { aSide: number[]; bSide: number[] }) {
  const newMatch: MatchHistory = {
    aSide: payload.aSide,
    bSide: payload.bSide,
    createdAt: new Date().toISOString(),
    status: "On Going",
  };

  return {
    ...state,
    matches: [...state.matches, newMatch],
  };
}

export default function Page() {
  const { actions, state } = useStateMachine({ actions: { addMatch } });

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex w-full flex-col pt-32 space-y-4">
        <MatchModal
          onSubmit={(result) => {
            actions.addMatch(result);
            showToast("success", "Match saved!");
          }}
          players={state.players}
          trigger={<Button className="rounded-full">New Match</Button>}
        />
        <MatchList />
      </div>
    </div>
  );
}
