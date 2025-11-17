import { Player } from "@/components/shared/navbar";

export default function updateAction(
  state: { players: Player[] },
  payload: Partial<{ players: Player[] }>,
) {
  return {
    ...state,
    ...payload,
  };
}
