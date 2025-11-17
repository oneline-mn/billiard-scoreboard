"use client";

import { createStore, useStateMachine } from "little-state-machine";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { addPlayer } from "@/components/shared/navbar";

createStore({
  players: [],
});

export default function Home() {
  const { state, actions } = useStateMachine({ actions: { addPlayer } });

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4">
      <div className="flex min-h-screen w-full flex-col pt-20 space-y-4">
        <div className="border rounded-xl">
          <div>
            {state.players.length === 0 ? (
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
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
