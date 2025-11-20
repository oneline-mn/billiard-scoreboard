import { useSyncExternalStore } from "react";

export default function useHydration() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}
