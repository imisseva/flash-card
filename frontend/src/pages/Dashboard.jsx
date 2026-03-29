import { useOutletContext } from "react-router-dom"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useDecks } from "@/hooks/use-decks";

export default function Dashboard() {
  const { decks } = useDecks()
  const { openCreateDeck } = useOutletContext()

  return (
    <>
          {/* Header Bar */}
          <header className="flex h-16 items-center border-b bg-white px-6 sticky top-0 z-10 justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <span>Pages</span>
                <span>/</span>
                <span className="font-medium text-slate-900">Dashboard</span>
              </div>
            </div>

            <Button 
              size="sm" 
              className="shadow-sm font-medium"
              onClick={openCreateDeck}
            >
              Tạo bộ thẻ mới
            </Button>
          </header>

          <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
            {/* 1. Welcome Section */}
            <section className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Chào mừng trở lại, Phong!
              </h1>
              <p className="text-slate-500">
                Hôm nay bạn muốn bắt đầu với chủ đề nào?
              </p>
            </section>

            {/* 2. Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Tổng số từ" value="128" color="blue" />
              <StatCard label="Đã thuộc" value="84" color="green" />
              <StatCard label="Streak" value="5 ngày" color="orange" />
              <StatCard label="Học tập" value="12.5h" color="purple" />
            </div>

            {/* 3. My Decks Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-bold tracking-tight text-slate-900">Bộ thẻ của bạn</h2>
                <Button variant="link" className="text-blue-600 hover:text-blue-700 font-medium">
                  Xem tất cả
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {decks.map((deck) => (
                  <Card 
                    key={deck.id} 
                    className="border-none shadow-sm bg-white hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <CardContent className="p-6 space-y-2">
                      <CardTitle className="text-lg font-bold text-slate-900">
                        {deck.title}
                      </CardTitle>
                      <CardDescription className="text-slate-500">
                        {Array.isArray(deck.cards) ? deck.cards.length : 0} cards • Đã học {deck.learned || 0}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* 4. Recent Activity */}
            <Card className="border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                <CardTitle className="text-lg font-bold">Hoạt động gần đây</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="space-y-2 text-sm border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                      <p className="text-slate-600">
                        Bạn đã hoàn thành 10 thẻ trong bộ <strong>Web Development</strong>
                      </p>
                      <span className="text-xs text-slate-400 italic font-medium">
                        2 giờ trước
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
    </>
  )
}

function StatCard({ label, value, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
  }
  return (
    <Card className="border-none shadow-sm bg-white">
      <CardContent className="p-6 space-y-2">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="text-2xl font-bold italic text-slate-900">{value}</p>
      </CardContent>
    </Card>
  )
}