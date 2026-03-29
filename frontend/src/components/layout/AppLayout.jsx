import { useState } from "react"
import { Outlet } from "react-router-dom"

import { useDecks } from "@/hooks/use-decks"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { CreateDeck } from "@/pages/CreateDeck"

export default function AppLayout() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { addDeck } = useDecks()

  const handleSaveDeck = (data) => {
    addDeck(data)
    setIsDialogOpen(false)
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50/50 text-slate-900">
        <AppSidebar onAddDeck={() => setIsDialogOpen(true)} />

        <main className="flex-1 overflow-auto">
          <Outlet context={{ openCreateDeck: () => setIsDialogOpen(true) }} />
        </main>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[400px] p-0 border-none bg-transparent shadow-none ring-0 [&>button]:hidden">
            <CreateDeck onSave={handleSaveDeck} onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  )
}
