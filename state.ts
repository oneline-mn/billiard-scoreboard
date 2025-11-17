import { createStore } from "little-state-machine";

export interface Player {
  id: number;
  playerName: string;
  totalMatch: number;
  wins: number;
}

declare module "little-state-machine" {
  interface GlobalState {
    players: Player[];
  }
}

createStore({
  players: [],
});
