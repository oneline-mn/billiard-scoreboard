"use client";

import { addPlayer } from "@/components/shared/navbar";
import { useStateMachine } from "little-state-machine";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Home() {
  const { state, actions } = useStateMachine({ actions: { addPlayer } });

  console.log(state.players);

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4">
      <div className="flex min-h-screen w-full flex-col pt-20 space-y-4">
        <div className="border rounded-xl">
          {state.players.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">#</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {state.players.map((player, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index}</TableCell>
                    <TableCell className="font-medium">{player.playerName}</TableCell>
                    <TableCell>{player.totalMatch}</TableCell>
                    <TableCell>{player.wins}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-foreground/70">No players added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
