"use client";

import { addPlayer } from "@/components/shared/navbar";
import { useStateMachine } from "little-state-machine";

export default function Home() {
  const { state, actions } = useStateMachine({ actions: { addPlayer } });

  console.log(state.players);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 dark:bg-black sm:items-start">
        {state.players.length > 0 ? (
          <ul className="w-full space-y-4">
            {state.players.map((player, index) => (
              <li key={index} className="w-full rounded-lg border border-fill p-4">
                <span className="font-medium text-foreground">{player.playerName}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-foreground/70">No players added yet.</p>
        )}
      </main>
    </div>
  );
}
