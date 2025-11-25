export type MatchStatus = "finished" | "on match";
export type WinnerType = "a" | "b" | null;

export interface MatchHistory {
  aSide: number[];
  bSide: number[];
  createdAt: string;
  status: MatchStatus;
}

export interface PlayerInputs {
  id: number;
  playerName: string;
  totalMatch: number;
  wins: number;
}
