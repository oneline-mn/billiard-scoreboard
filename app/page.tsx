import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { createStore, useStateMachine } from "little-state-machine";
import { SubmitHandler } from "react-hook-form";
// import { useForm } from "react-hook-form";
import { showToast } from "@/components/shared/use-toast";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

export interface Player {
  firstName: string;
  playerName: string;
  age: number;
}
declare module "little-state-machine" {
  interface GlobalState {
    players: Player[];
  }
}

createStore({
  players: [],
});

// Action
export function addPlayer(state: { players: Player[] }, payload: { players: Player[] }) {
  return {
    ...state,
    players: [...state.players, payload],
  };
}

export default function Home() {
  // const { actions } = useStateMachine({ actions: { addPlayer } });

  // const { register, handleSubmit, reset } = useForm<Player>({
  //   defaultValues: {
  //     firstName: "asd",
  //     playerName: "asd",
  //     age: 0,
  //   },
  // });

  // const onSubmit: SubmitHandler<Player> = (data) => {
  //   actions.addPlayer(data);
  //   showToast("success", `Тоглогч ${data.playerName} нэмэгдлээ!`);
  //   reset();
  // };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans dark:bg-black">
    
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 dark:bg-black sm:items-start">
      </main>
    </div>
  );
}
