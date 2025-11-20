"use client";

import { useStateMachine } from "little-state-machine";
import { Plus } from "lucide-react";

import { CustomDialog } from "@/components/shared/custom-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useHydration from "@/lib/use-hydration";
import { cn } from "@/lib/utils";

interface SideListProps {
  classNames?: string;
  playerIds: number[];
  players: Array<{ id: number; playerName: string; totalMatch: number; wins: number }>;
  right?: string;
  title: string;
}

export default function MatchList() {
  const { state } = useStateMachine();
  const isHydrated = useHydration();

  const matches = state.matches;
  const players = state.players;

  return (
    <>
      {isHydrated && (
        <div className="w-full">
          {matches.length === 0 ? (
            <p className="text-center text-muted-foreground">No matches yet</p>
          ) : (
            <div className="flex flex-col-reverse gap-4">
              {matches.map((match, i) => {
                return (
                  <div className="border border-fill rounded-xl flex flex-col relative bg-ring" key={i}>
                    <div className="flex flex-col sm:flex-row p-8 gap-10 sm:gap-0">
                      <SideList classNames="flex-2 sm:order-1" playerIds={match.aSide} players={players} title="A Side" />
                      <div className="flex items-center justify-center flex-col gap-2 flex-1 order-first sm:order-2">
                        <span className="text-primary text-xl font-bold">Match #{i + 1}</span>
                        <div className="text-xs flex items-center gap-2">
                          <span className="relative flex size-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span> <span className="relative inline-flex size-2 rounded-full bg-teal-500"></span>
                          </span>
                          <span>On match</span>
                        </div>
                      </div>
                      <SideList classNames="sm:text-right flex-2 order-3" playerIds={match.bSide} players={players} right="sm:order-last" title="B Side" />
                    </div>
                    <div className="items-center justify-between flex border-t px-8 py-4">
                      <p className="text-xs text-slate-400">{new Date(match.createdAt).toLocaleString()}</p>

                      <CustomDialog
                        contentClassName="max-w-sm!"
                        showFooter
                        title="Choose Winner Side"
                        trigger={
                          <Button className="rounded-full" variant={"secondary"}>
                            <Plus strokeWidth={3} />
                            Finish match
                          </Button>
                        }
                      >
                        <RadioGroup defaultValue="option-one">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem id="option-one" value="option-one" />
                            <Label htmlFor="option-one">A side</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem id="option-two" value="option-two" />
                            <Label htmlFor="option-two">B Side</Label>
                          </div>
                        </RadioGroup>
                      </CustomDialog>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export function SideList({ classNames, playerIds, players, right, title }: SideListProps) {
  return (
    <div className={cn("w-full flex flex-col col-span-2", classNames)}>
      <h1 className="text-primary uppercase font-bold mb-4">
        {title} - {playerIds.length}P
      </h1>

      {playerIds.map((playerId) => {
        const player = players.find((p) => p.id === playerId);
        if (!player) return null;

        return (
          <div className="flex border-b first:border-t text-sm py-2" key={player.id}>
            <h1 className={cn("font-bold flex-1", right)}>{player.playerName}</h1>

            <div className="grid grid-cols-3 flex-1">
              <h1 className="text-green-300">{player.wins}</h1>
              <h1 className="text-red-300">{player.totalMatch - player.wins}</h1>
              <h1>{player.wins}</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
}
