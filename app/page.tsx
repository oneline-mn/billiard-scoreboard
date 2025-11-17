"use client";

import { addPlayer } from "@/components/shared/navbar";
import { useStateMachine } from "little-state-machine";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";

export default function Home() {
  const { state, actions } = useStateMachine({ actions: { addPlayer } });

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4">
      <div className="flex min-h-screen w-full flex-col pt-20 space-y-4">
        <div className="border rounded-xl">
          <ClientOnly>
            {state.players.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">
                    No players yet
                  </TableCell>
                </TableRow>
              </TableBody>
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
                      <TableCell className="font-medium">{index}</TableCell>
                      <TableCell className="font-medium">{player.playerName}</TableCell>
                      <TableCell>{player.totalMatch}</TableCell>
                      <TableCell>{player.wins}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </ClientOnly>
        </div>
      </div>
    </div>
  );
}

// TODO: Client bolon SSR tekst ylgaatain bn gesen error, client render uydl haruulah
export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <>{children}</>;
}
