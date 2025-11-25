"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { CustomDialog } from "@/components/shared/custom-dialog";
import { PlayerInputs } from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SidePreview } from "./side-preview";

export type MatchStatus = "finished" | "on match";

export interface MatchHistory {
  aSide: number[];
  bSide: number[];
  createdAt: string;
  status: MatchStatus;
}

interface MatchModalProps {
  initialData?: MatchHistory;
  mode?: "create" | "review";
  onSubmit: (data: { aSide: number[]; bSide: number[]; updatedPlayers?: PlayerInputs[]; winnerSide?: "a" | "b" }) => void;
  players: PlayerInputs[];
  trigger: React.ReactNode;
}

export function MatchModal({ initialData, mode = "create", onSubmit, players, trigger }: MatchModalProps) {
  const [playerSearch, setPlayerSearch] = useState("");
  const [step, setStep] = useState(1);
  const [winnerSide, setWinnerSide] = useState<"a" | "b" | null>(null);

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      aSide: initialData?.aSide || [],
      bSide: initialData?.bSide || [],
    },
  });

  const filteredPlayers = players.filter((p) => p.playerName.toLowerCase().includes(playerSearch.toLowerCase()));

  // WARNING: watch()
  const aSideSelected = watch("aSide");
  const bSideSelected = watch("bSide");

  function nextStep() {
    setStep((prev) => Math.min(prev + 1, 2));
  }

  function prevStep() {
    setStep((prev) => Math.max(prev - 1, 1));
  }

  function onSubmitHandler(data: { aSide: number[]; bSide: number[] }) {
    if (winnerSide) {
      const winningSideIds = winnerSide === "a" ? data.aSide : data.bSide;
      const losingSideIds = winnerSide === "a" ? data.bSide : data.aSide;

      const updatedPlayers = players.map((p) => {
        if (winningSideIds.includes(p.id)) {
          return { ...p, totalMatch: p.totalMatch + 1, wins: p.wins + 1 };
        } else if (losingSideIds.includes(p.id)) {
          return { ...p, totalMatch: p.totalMatch + 1 };
        }
        return p;
      });

      onSubmit({
        aSide: data.aSide,
        bSide: data.bSide,
        updatedPlayers,
        winnerSide,
      });
    } else {
      onSubmit({
        aSide: data.aSide,
        bSide: data.bSide,
        winnerSide: undefined,
      });
    }

    // ATTENTION: Reset modal
    if (mode === "create") {
      reset({ aSide: [], bSide: [] });
      setWinnerSide(null);
      setStep(1);
    }
  }

  return (
    <CustomDialog contentClassName="max-w-4xl!" showFooter={false} title={mode === "review" ? "Edit Match" : "Choose Players"} trigger={trigger}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="grid grid-cols-3 gap-4 mb-10">
          {step === 1 && (
            <div className="space-y-3">
              <h1 className="font-semibold text-green-400 text-center text-sm">A Side</h1>
              <Input onChange={(e) => setPlayerSearch(e.target.value)} placeholder="Search A Side..." value={playerSearch} />

              {/* ATTENTION: Modal A Side player */}
              <ScrollArea className="max-h-[50vh] border flex p-1 flex-col gap-1 rounded">
                <Controller
                  control={control}
                  name="aSide"
                  render={({ field }) => (
                    <div className="flex flex-col">
                      {filteredPlayers.map((p) => {
                        const isDisabled = bSideSelected.includes(p.id);
                        return (
                          <div className={cn("flex gap-2 border-b h-10 items-center last:border-b-0 pl-1", isDisabled ? "opacity-50 cursor-not-allowed" : "")} key={p.id}>
                            <Checkbox
                              checked={field.value.includes(p.id)}
                              disabled={isDisabled}
                              id={p.id.toString()}
                              onCheckedChange={(checked) => {
                                const newValue = checked ? [...field.value, p.id] : field.value.filter((x) => x !== p.id);
                                field.onChange(newValue);
                              }}
                            />
                            <Label className="size-full" htmlFor={p.id.toString()}>
                              {p.playerName}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  )}
                />
              </ScrollArea>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <h1 className="font-semibold text-red-400 text-center text-sm">B Side</h1>
              <Input onChange={(e) => setPlayerSearch(e.target.value)} placeholder="Search B Side..." value={playerSearch} />

              {/* ATTENTION: Modal B Side player */}
              <ScrollArea className="max-h-[50vh] border flex p-1 flex-col gap-1 rounded">
                <Controller
                  control={control}
                  name="bSide"
                  render={({ field }) => (
                    <div className="flex flex-col">
                      {filteredPlayers.map((p) => {
                        const isDisabled = aSideSelected.includes(p.id);
                        return (
                          <div className={cn("flex gap-2 border-b h-10 items-center last:border-b-0 pl-1", isDisabled ? "opacity-50 cursor-not-allowed" : "")} key={p.id}>
                            <Checkbox
                              checked={field.value.includes(p.id)}
                              disabled={isDisabled}
                              id={p.id.toString()}
                              onCheckedChange={(checked) => {
                                const newValue = checked ? [...field.value, p.id] : field.value.filter((x) => x !== p.id);
                                field.onChange(newValue);
                              }}
                            />
                            <Label className="size-full" htmlFor={p.id.toString()}>
                              {p.playerName}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  )}
                />
              </ScrollArea>
            </div>
          )}

          <div className="border-l pl-4 col-span-2 flex flex-col">
            <h1 className="font-semibold text-center text-sm mb-10">Players overview</h1>
            <div className="flex flex-col gap-1 justify-between size-full text-xs">
              {/* ATTENTION: Modal Overview */}
              <div className="flex flex-col gap-1">
                <SidePreview players={players} selectedSide={aSideSelected} winner={winnerSide} sideLabel="a" />
                <h1 className="text-center my-3 text-sm font-bold">VS</h1>
                <SidePreview players={players} selectedSide={bSideSelected} winner={winnerSide} sideLabel="b" />
              </div>

              {/* TODO: Win side songoh */}
              {aSideSelected.length !== 0 && bSideSelected.length !== 0 && (
                <RadioGroup className="flex items-center gap-4 mt-4 justify-center capitalize border-t pt-4" onValueChange={(v) => setWinnerSide(v as "a" | "b")} value={winnerSide ?? ""}>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem id="a-side" value="a" />
                    <Label htmlFor="a-side">A side Wins</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem id="b-side" value="b" />
                    <Label htmlFor="b-side">B side Wins</Label>
                  </div>
                </RadioGroup>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          {step === 1 && (
            <Button onClick={nextStep} variant="secondary">
              Select B Side Players
            </Button>
          )}
          {step === 2 && (
            <div className="flex justify-between w-full">
              <Button onClick={prevStep} variant="secondary">
                Back to A Side
              </Button>
              <DialogClose asChild>
                <Button disabled={aSideSelected.length === 0 || bSideSelected.length === 0} type="submit">
                  {mode === "review" ? "Save match" : "Create Match"}
                </Button>
              </DialogClose>
            </div>
          )}
        </DialogFooter>
      </form>
    </CustomDialog>
  );
}
