"use client";

import { createStore, useStateMachine } from "little-state-machine";
import { useSyncExternalStore } from "react"; import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

createStore({ players: [] });

function useHydration() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

const event = {
  address: "123 Tech Street",
  date: new Date("2023-09-15"),
  location: {
    city: "San Francisco",
    country: "USA",
    description: "Annual conference discussing the latest in technology.",
    postalCode: "94103",
    state: "CA",
    venue: "Tech Center",
  },
  organizer: {
    email: "charlie.brown@protonmail.com", name: "Charlie Brown",
    phone: "555-1234",
  },
  schedule: [
    {
      activity: "Registration",
      speaker: null,
      time: "09:00 AM",
    },
    {
      activity: "Opening Keynote",
      speaker: "Jane Doe",
      time: "10:00 AM",
    },
    {
      activity: "Tech Trends 2023",
      speaker: "Alice Johnson",
      time: "11:00 AM",
    },
  ],
  status: "upcoming",
  title: "Tech Conference 2023",
};

export default function Home() {
  const { state } = useStateMachine();
  const isHydrated = useHydration();

  console.log(event);
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
