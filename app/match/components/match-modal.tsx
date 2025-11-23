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

import { MatchHistory } from "../page";

interface MatchModalProps {
  initialData?: MatchHistory;
  onSubmit: (data: { aSide: number[]; bSide: number[] }) => void;
  players: PlayerInputs[];
  trigger: React.ReactNode;
}

export function MatchModal({ initialData, onSubmit, players, trigger }: MatchModalProps) {
  const [aSearch, setASearch] = useState("");
  const [bSearch, setBSearch] = useState("");
  const [step, setStep] = useState(1);

  // TODO: 
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      aSide: initialData?.aSide || [],
      bSide: initialData?.bSide || [],
    },
  });

  // WARNING: watch()
  const aSideSelected = watch("aSide");
  const bSideSelected = watch("bSide");

  const filteredASide = players.filter((p) => p.playerName.toLowerCase().includes(aSearch.toLowerCase()));
  const filteredBSide = players.filter((p) => p.playerName.toLowerCase().includes(bSearch.toLowerCase()));

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 2));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const onSubmitHandler = (data: { aSide: number[]; bSide: number[] }) => {
    onSubmit({
      aSide: data.aSide,
      bSide: data.bSide,
    });

    reset({ aSide: [], bSide: [] });
    setStep(1);
  };

  const SideOverview = ({ selectedSide }: { selectedSide: number[] }) => {
    return (
      <>
        {selectedSide.length === 0 ? (
          <p className="text-red-300 py-1">No players selected</p>
        ) : (
          <>
            {[...selectedSide].map((playerId, i) => {
              const player = players.find((p) => p.id === playerId);
              if (!player) return null;
              return (
                <div className="border p-2 rounded flex justify-between" key={i}>
                  <h1 className="flex-1">{player.playerName}</h1>
                  <div className="flex-1 w-full grid grid-cols-3">
                    <h1 className="text-green-300">{player.wins}</h1>
                    <h1 className="text-red-300">{player.totalMatch - player.wins}</h1>
                    <h1>{player.wins}</h1>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </>
    );
  };

  return (
    <CustomDialog contentClassName="max-w-4xl!" showFooter={false} title="Choose Players" trigger={trigger}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="grid grid-cols-2 gap-4 mb-10">
          {step === 1 && (
            <div className="space-y-3">
              <h1 className="font-semibold text-green-400 text-center text-sm">A Side</h1>
              <Input onChange={(e) => setASearch(e.target.value)} placeholder="Search A Side..." value={aSearch} />

              {/* ATTENTION: A Side player */}
              <ScrollArea className="max-h-[50vh] border flex p-1 flex-col gap-1 rounded">
                <Controller
                  control={control}
                  name="aSide"
                  render={({ field }) => (
                    <div className="flex flex-col">
                      {filteredASide.map((p) => {
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

          {step === 2 && (
            <div className="space-y-3">
              <h1 className="font-semibold text-red-400 text-center text-sm">B Side</h1>
              <Input onChange={(e) => setBSearch(e.target.value)} placeholder="Search B Side..." value={bSearch} />

              {/* ATTENTION: B Side player */}
              <ScrollArea className="max-h-[50vh] border flex p-1 flex-col gap-1 rounded">
                <Controller
                  control={control}
                  name="bSide"
                  render={({ field }) => (
                    <div className="flex flex-col">
                      {filteredBSide.map((p) => {
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

          <div className="border-l pl-4 flex flex-col">
            <h1 className="font-semibold text-center text-sm mb-10">Players overview</h1>
            <div className="flex flex-col gap-1 justify-between size-full text-xs">
              {/* ATTENTION: Overview */}
              <div className="flex flex-col gap-1">
                <SideOverview selectedSide={aSideSelected} />
                <h1 className="text-center my-3 text-sm font-bold">VS</h1>
                <SideOverview selectedSide={bSideSelected} />
              </div>

              {/* TODO: Win side */}
              {aSideSelected.length !== 0 && bSideSelected.length !== 0 && (
                <RadioGroup className="flex items-center gap-4 mt-4 justify-center capitalize">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem disabled id="r1" value="a" />
                    <Label htmlFor="r1">A side Wins</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem disabled id="r2" value="b" />
                    <Label htmlFor="r2">B side Wins</Label>
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
                  Create Match
                </Button>
              </DialogClose>
            </div>
          )}
        </DialogFooter>
      </form>
    </CustomDialog>
  );
}
