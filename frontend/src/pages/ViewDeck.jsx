import * as React from "react"
import { useNavigate } from "react-router-dom"
import { useDecks } from "@/hooks/use-decks"
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Search, MoreHorizontal } from "lucide-react"

const colorMap = {
  blue: "border-l-blue-500",
  green: "border-l-green-500",
  orange: "border-l-orange-500",
  purple: "border-l-purple-500",
  red: "border-l-red-500",
}

export default function ViewDeck() {
  const { decks } = useDecks()
  const [search, setSearch] = React.useState("")
  const navigate = useNavigate()

  // Logic lọc bộ thẻ theo từ khóa tìm kiếm
  const filteredDecks = decks.filter(deck => 
    deck.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50/30 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="pl-0 hover:bg-transparent text-slate-500 hover:text-slate-900 mb-2"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Quay lại Dashboard
            </Button>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Thư viện bộ thẻ
            </h1>
            <p className="text-slate-500 font-medium">
              Bạn đang có {decks.length} chủ đề học tập.
            </p>
          </div>

          {/* Search Bar - Tối giản, không icon rườm rà */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Tìm bộ thẻ (VD: Cloud, Web...)" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 border-slate-200 focus-visible:ring-slate-950 shadow-sm bg-white"
            />
          </div>
        </div>

        {/* Grid danh sách bộ thẻ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDecks.length > 0 ? (
            filteredDecks.map((deck) => (
              <Card 
                key={deck.id} 
                className={`group relative hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-l-4 ${colorMap[deck.color] || "border-l-slate-400"} bg-white border-y-0 border-r-0`}
                onClick={() => navigate(`/deck/${deck.id}`)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="group-hover:text-blue-600 transition-colors text-xl font-bold">
                      {deck.title}
                    </CardTitle>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription className="font-medium text-slate-500">
                    {Array.isArray(deck.cards) ? deck.cards.length : 0} cards • {deck.learned || 0} đã thuộc
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
                    <div 
                      className="bg-slate-950 h-full transition-all duration-700" 
                      style={{ 
                        width: `${deck.cards?.length > 0 ? (deck.learned / deck.cards.length) * 100 : 0}%` 
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-500 font-medium italic">
                Không tìm thấy bộ thẻ nào khớp với "{search}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}