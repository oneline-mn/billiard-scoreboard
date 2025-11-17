import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useStateMachine } from "little-state-machine";
import { addPlayer } from "@/components/shared/navbar";

export default function Leaderboard() {
  const { state, actions } = useStateMachine({ actions: { addPlayer } });

  console.log(state.players);

  return (
    <>
      {/* {state.players.length > 0 && (
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
              <TableRow key={player.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{player.playerName}</TableCell>
                <TableCell>{player.totalMatch}</TableCell>
                <TableCell>{player.wins}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )} */}
      {/* {state.players.map((player, index) => (
        <p key={index}>{player.playerName}</p>
      ))} */}
    </>
  );
}
