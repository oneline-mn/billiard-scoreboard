import { MatchHistory } from "./app/match/components/match-modal";
import { PlayerInputs } from "./components/shared/navbar";

export function updateMatchList(state: { matches: MatchHistory[]; players: PlayerInputs[] }, payload: { matchIndex: number; updatedMatch: MatchHistory; updatedPlayers?: PlayerInputs[] }) {
  const newMatches = [...state.matches];
  newMatches[payload.matchIndex] = payload.updatedMatch;

  return {
    ...state,
    matches: newMatches,
    players: payload.updatedPlayers || state.players,
  };
}

export function resetState(state: { matches: MatchHistory[]; players: PlayerInputs[] }) {
  return {
    ...state,
    matches: [],
    players: [],
  };
}


export function addMatch(state: { matches: MatchHistory[]; players: PlayerInputs[] }, payload: { aSide: number[]; bSide: number[]; winnerSide?: "a" | "b" }) {
  const newMatch: MatchHistory = {
    aSide: payload.aSide,
    bSide: payload.bSide,
    createdAt: new Date().toISOString(),
    status: payload.winnerSide ? "finished" : "on match",
  };

  const updatedPlayers = payload.winnerSide
    ? state.players.map((p) => {
        const isWinner = payload.winnerSide === "a" ? payload.aSide.includes(p.id) : payload.bSide.includes(p.id);
        const isLoser = payload.aSide.includes(p.id) || payload.bSide.includes(p.id);

        return isWinner ? { ...p, totalMatch: p.totalMatch + 1, wins: p.wins + 1 } : isLoser ? { ...p, totalMatch: p.totalMatch + 1 } : p;
      })
    : state.players;

  return {
    ...state,
    matches: [...state.matches, newMatch],
    players: updatedPlayers,
  };
}