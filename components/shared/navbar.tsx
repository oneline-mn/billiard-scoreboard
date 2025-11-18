"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { Component, Plus, ScreenShare } from "lucide-react";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import { CustomDialog } from "./custom-dialog";
import { Input } from "../ui/input";
import { useStateMachine } from "little-state-machine";
import { SubmitHandler, useForm } from "react-hook-form";
import { showToast } from "./use-toast";

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
  const { actions } = useStateMachine({ actions: { addPlayer } });

  const { register, handleSubmit, reset } = useForm<Omit<PlayerInputs, "id">>({
    defaultValues: {
      playerName: "Player",
      totalMatch: 0,
      wins: 0,
    },
  });

  const onSubmit: SubmitHandler<Omit<PlayerInputs, "id">> = (data) => {
    actions.addPlayer(data);
    console.log(data.playerName);
    showToast("success", `Тоглогч ${data.playerName} нэмэгдлээ!`);

    reset();
  };

  return (
    <section className="w-full sticky top-4">
      <div className="max-w-4xl border border-fill rounded-full w-fit mx-auto flex items-center">
        <div className="bg-background  p-2 rounded-full flex justify-between items-center space-x-4">
          <div className="flex h-full space-x-2">
            <Button variant={pathname === "/" ? "secondary" : "outline"} asChild className="h-10 rounded-full">
              <Link href={"/"} className="font-semibold">
                Leaderboard
              </Link>
            </Button>
            <Button variant={pathname === "/match" ? "secondary" : "outline"} asChild className="h-10 rounded-full">
              <Link href={"/match"} className="font-semibold">
                Match
              </Link>
            </Button>

            <CustomDialog
              trigger={
                <Button className="rounded-full size-10">
                  <Plus />
                </Button>
              }
              title="Add new player"
              contentClassName="max-w-sm!"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col space-y-4 rounded-xl">
                  <Input id="player-name" placeholder="First Name" className="" {...register("playerName")} />
                </div>
              </form>
            </CustomDialog>
          </div>
        </div>
        <Separator orientation="vertical" className="mx-2 h-8! w-1" />

        <div className="bg-background  p-2 rounded-full flex justify-between items-center">
          <div className="flex gap-2 ">
            <Button variant="outline" asChild className="size-10 rounded-full">
              <Link href={"/design-system"} className="italic font-semibold">
                <Component />
              </Link>
            </Button>
            <Button variant="outline" asChild className="size-10 rounded-full">
              <Link href="https://billboard.dulmandakh-bce.workers.dev" className="italic font-semibold">
                <ScreenShare />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
