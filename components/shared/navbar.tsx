"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import { CustomDialog } from "./custom-dialog";
import { Input } from "../ui/input";
import { useStateMachine } from "little-state-machine";
import { SubmitHandler, useForm } from "react-hook-form";
import { showToast } from "./use-toast";
import { DEVNAV_LIST, NAV_LIST } from "@/lib/constants";
import { Plus, RotateCcw } from "lucide-react";
import { MatchHistory } from "@/app/match/page";
import { resetState } from "@/app/page";

export interface PlayerInputs {
  id: number;
  playerName: string;
  totalMatch: number;
  wins: number;
}

export function addPlayer(state: { players: PlayerInputs[]; matches: MatchHistory[] }, payload: Omit<PlayerInputs, "id">) {
  const newPlayer: PlayerInputs = {
    id: state.players.length + 1,
    ...payload,
  };

  return {
    ...state,
    players: [...state.players, newPlayer],
  };
}

export default function Navbar() {
  const pathname = usePathname();
  const { state, actions } = useStateMachine({ actions: { addPlayer, resetState } });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<PlayerInputs, "id">>({
    defaultValues: {
      totalMatch: 0,
      wins: 0,
    },
  });

  function onSubmit (data: Omit<PlayerInputs, "id">) {
    if (!data.playerName || !data.playerName.trim()) {
      showToast("error", "Тоглогчийн нэр хоосон байж болохгүй!");
      return;
    }

    const namesSet = new Set(state.players.map((p) => p.playerName.toLowerCase()));

    if (namesSet.has(data.playerName.toLowerCase())) {
      showToast("error", "Бүртгэлтэй тоглогч");
      return;
    }

    actions.addPlayer(data);
    console.log(data.playerName);
    showToast(
      "success",
      <h1>
        Тоглогч <span className="font-bold text-primary">{data.playerName}</span> нэмэгдлээ!
      </h1>
    );
    reset();
  };

  return (
    <section className="w-full sticky top-4 z-40">
      <div className="max-w-4xl rounded-full w-fit mx-auto flex items-center">
        <div className="flex justify-between items-center gap-2">
          <div className="flex rounded-full items-center gap-4 bg-background p-2 border border-fill">
            <div className="flex gap-2">
              {NAV_LIST.map((list) => (
                <Button key={list.name} variant={pathname === list.url ? "secondary" : "outline"} asChild className=" rounded-full">
                  <Link href={list.url} className="font-semibold capitalize">
                    <span>{list.icon}</span>
                    <span>{list.name}</span>
                  </Link>
                </Button>
              ))}
            </div>
            <Separator orientation="vertical" className="h-8! w-1" />

           <div className="flex items-center h-full gap-2">
             <CustomDialog
              trigger={
                <Button className="rounded-full h-full bg-primary hover:bg-lime-300 transition-all">
                  <Plus strokeWidth={3} />
                  Add Player
                </Button>
              }
              title="Add new player"
              contentClassName="max-w-sm!"
              showFooter
              onConfirm={handleSubmit(onSubmit)}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col space-y-4 rounded-xl">
                  <Input id="player-name" placeholder="Player Name..." className="" {...register("playerName", { required: true })} />
                  {errors.playerName && errors.playerName.type === "required" && <span className="text-red-300 text-xs">Player name is required</span>}
                </div>
              </form>
            </CustomDialog>

            <Button variant={"outline"} onClick={() => actions.resetState()} className="aspect-square rounded-full">
              <RotateCcw />
            </Button>
           </div>
          </div>
          <div className="flex h-full rounded-full items-center gap-4 bg-background p-2 border border-fill">
            {DEVNAV_LIST.map((list) => (
              <Button key={list.name} variant="outline" asChild className="rounded-full">
                <Link href={list.url} className="italic font-semibold capitalize" target="_blank" rel="noopener noreferrer">
                  {list.icon}
                  {list.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
