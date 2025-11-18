"use client";

import { addPlayer } from "@/components/shared/navbar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createStore, useStateMachine } from "little-state-machine";
import { useSyncExternalStore } from "react";

createStore({ players: [] });

function useHydration() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export default function Home() {
  const { state } = useStateMachine();
  const isHydrated = useHydration();

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4">
      <div className="flex min-h-screen w-full flex-col pt-20 space-y-4">
        <div className="border rounded-xl">
          <div>
            {!isHydrated || state.players.length === 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Player Name</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Win</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No players yet
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Player Name</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Win</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {state.players.map((player, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="font-medium">{player.playerName}</TableCell>
                      <TableCell>{player.totalMatch}</TableCell>
                      <TableCell>{player.wins}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
