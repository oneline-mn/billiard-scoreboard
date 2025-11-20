"use client";

import { useState } from "react";

import { CustomDialog } from "@/components/shared/custom-dialog";
import { PlayerInputs } from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MatchModalProps {
  onSubmit: (data: { aSide: number[]; bSide: number[] }) => void;
  players: PlayerInputs[];
  trigger: React.ReactNode;
}

export function MatchModal({ onSubmit, players, trigger }: MatchModalProps) {
  const [aSearch, setASearch] = useState("");
  const [bSearch, setBSearch] = useState("");

  const [aSide, setASide] = useState<number[]>([]);
  const [bSide, setBSide] = useState<number[]>([]);

  const toggleASide = (id: number) => {
    if (aSide.includes(id)) {
      setASide(aSide.filter((x) => x !== id));
    } else {
      setASide([...aSide, id]);
      setBSide(bSide.filter((x) => x !== id));
    }
  };

  const toggleBSide = (id: number) => {
    if (bSide.includes(id)) {
      setBSide(bSide.filter((x) => x !== id));
    } else {
      setBSide([...bSide, id]);
      setASide(aSide.filter((x) => x !== id));
    }
  };

  // ATTENTION Ux taldaa lowercase bolgoson. For search usage
  const filteredASide = players.filter((p) => p.playerName.toLowerCase().includes(aSearch.toLowerCase()));

  const filteredBSide = players.filter((p) => p.playerName.toLowerCase().includes(bSearch.toLowerCase()));

  const [step, setStep] = useState(1);
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 2));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <CustomDialog contentClassName="max-w-4xl!" onConfirm={() => onSubmit({ aSide, bSide })} showFooter={false} title="Choose Players" trigger={trigger}>
      <div className="grid grid-cols-2 gap-4 mb-10">
        {/* A Side */}
        {step === 1 && (
          <div className="space-y-3">
            <h1 className="font-semibold text-green-400 text-center text-sm">A Side</h1>
            <Input onChange={(e) => setASearch(e.target.value)} placeholder="Search A Side..." value={aSearch} />
            <ScrollArea className="max-h-[50vh] border flex p-1 flex-col gap-1 rounded">
              {filteredASide.map((p) => (
                <div className={`p-2 my-1 rounded cursor-pointer ${bSide.includes(p.id) ? "bg-border opacity-40 cursor-not-allowed" : aSide.includes(p.id) ? "bg-primary text-background" : "hover:bg-fill"}`} key={p.id} onClick={() => !bSide.includes(p.id) && toggleASide(p.id)}>
                  {p.playerName} <span className="text-sm">#{p.id}</span>
                </div>
              ))}
            </ScrollArea>
          </div>
        )}

        {/* B Side */}
        {step === 2 && (
          <div className="space-y-3">
            <h1 className="font-semibold text-red-400 text-center text-sm">B Side</h1>
            <Input onChange={(e) => setBSearch(e.target.value)} placeholder="Search B Side..." value={bSearch} />
            <ScrollArea className="max-h-[50vh] border flex p-1 flex-col gap-1 rounded">
              {filteredBSide.map((p) => (
                <div className={`p-2 my-1 rounded cursor-pointer ${aSide.includes(p.id) ? "bg-border opacity-40 cursor-not-allowed" : bSide.includes(p.id) ? "bg-red-400" : "hover:bg-fill"}`} key={p.id} onClick={() => !aSide.includes(p.id) && toggleBSide(p.id)}>
                  {p.playerName} <span className="text-sm">#{p.id}</span>
                </div>
              ))}
            </ScrollArea>
          </div>
        )}

        {/* Match side */}
        <div className="border-l pl-4 flex flex-col">
          <h1 className="font-semibold text-center text-sm mb-10">Players overview in side</h1>

          <div className="flex flex-col gap-2 w-full text-xs">
            {aSide.length === 0 ? (
              <p className="text-red-300 py-1">No players selected</p>
            ) : (
              aSide?.map((playerId, i) => {
                const player = players.find((p) => p.id === playerId);
                return (
                  <div key={i}>
                    {player?.playerName} — Total Matches: {player?.totalMatch}, Wins: {player?.wins}
                  </div>
                );
              })
            )}
          </div>

          <h1 className="text-center my-3 text-sm font-bold">VS</h1>

          <div className="flex flex-col gap-2 w-full text-xs">
            {bSide.length === 0 ? (
              <p className="text-red-300 py-1">No players selected</p>
            ) : (
              bSide?.map((playerId, i) => {
                const player = players.find((p) => p.id === playerId);
                return (
                  <div key={i}>
                    {player?.playerName} — Total Matches: {player?.totalMatch}, Wins: {player?.wins}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <DialogFooter>
        <div className="flex justify-between">{step === 1 && <Button onClick={nextStep}>Next</Button>}</div>
        {step === 2 && (
          <>
            <Button onClick={prevStep} variant={"outline"}>
              Back
            </Button>
            <DialogClose asChild disabled={aSide.length === 0 || bSide.length === 0}>
              <Button onClick={() => onSubmit({ aSide, bSide })}>Create match</Button>
            </DialogClose>
          </>
        )}
      </DialogFooter>
    </CustomDialog>
  );
}
