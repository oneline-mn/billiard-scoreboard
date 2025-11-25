"use client";

import { createStore, useStateMachine } from "little-state-machine";
import { Plus } from "lucide-react";

import { showToast } from "@/components/shared/use-toast";
import { Button } from "@/components/ui/button";

import MatchList from "./components/match-list";
import { MatchModal } from "./components/match-modal";
import { addMatch, updateMatchList } from "@/actions";

createStore({
  matches: [],
  players: [],
});

export default function Page() {
  const { actions, state } = useStateMachine({ actions: { addMatch, updateMatchList } });

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex w-full flex-col items-center py-20 space-y-4">
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
