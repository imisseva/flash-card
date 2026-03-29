import { createContext, useContext, useState } from "react"

export const DecksContext = createContext(null)

const initialDecks = [
  { id: 1, title: "Web Development", cards: 20, learned: 15, color: "blue" },
  { id: 2, title: "Cloud Computing", cards: 12, learned: 5, color: "green" },
  { id: 3, title: "Embedded Systems", cards: 30, learned: 0, color: "orange" },
]

export function DecksProvider({ children }) {
  const [decks, setDecks] = useState(initialDecks)

  const addDeck = (newDeck) => {
    setDecks((prevDecks) => [
      ...prevDecks,
      {
        ...newDeck,
        id: Date.now(),
        cards: Array.isArray(newDeck.cards) ? newDeck.cards : [],
        learned: typeof newDeck.learned === "number" ? newDeck.learned : 0,
        color: newDeck.color || "purple",
      },
    ])
  }

  return (
    <DecksContext.Provider value={{ decks, addDeck }}>
      {children}
    </DecksContext.Provider>
  )
}

export function useDecks() {
  const context = useContext(DecksContext)
  if (!context) {
    throw new Error("useDecks must be used within a DecksProvider")
  }
  return context
}
