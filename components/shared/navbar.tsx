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
import { Plus } from "lucide-react";

export interface PlayerInputs {
  id: number;
  playerName: string;
  totalMatch: number;
  wins: number;
}

declare module "little-state-machine" {
  interface GlobalState {
    players: PlayerInputs[];
  }
}

export function addPlayer(state: { players: PlayerInputs[] }, payload: Omit<PlayerInputs, "id">) {
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
  const { state, actions } = useStateMachine({ actions: { addPlayer } });

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

  const onSubmit: SubmitHandler<Omit<PlayerInputs, "id">> = (data) => {
    if (!data.playerName.trim()) {
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
          <div className="flex h-full rounded-full items-center gap-4 bg-background p-2 border border-fill">
            <div className="flex gap-2">
              {NAV_LIST.map((list) => (
                <Button key={list.name} variant={pathname === list.url ? "secondary" : "outline"} asChild className="h-10 rounded-full">
                  <Link href={list.url} className="font-semibold capitalize">
                    <span>{list.icon}</span>
                    <span>{list.name}</span>
                  </Link>
                </Button>
              ))}
            </div>
            <Separator orientation="vertical" className="h-8! w-1" />

            <CustomDialog
              trigger={
                <Button className="rounded-full h-full bg-lime-400 hover:bg-lime-300 transition-all shadow-[0_0_15px_-3px_rgba(163,230,53,0.7)]">
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
          </div>
          <div className="flex h-full rounded-full items-center gap-4 bg-background p-2 border border-fill">
            {DEVNAV_LIST.map((list) => (
              <Button key={list.name} variant="outline" asChild className="h-full rounded-full">
                <Link href={"fb.com"} className="italic font-semibold capitalize" target="_blank">
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
