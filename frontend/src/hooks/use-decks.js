import { useContext } from "react";
import { DecksContext } from "@/context/DecksContext";

export function useDecks() {
  const context = useContext(DecksContext);
  if (!context) {
    throw new Error("useDecks must be used within a DecksProvider");
  }
  return context;
}
