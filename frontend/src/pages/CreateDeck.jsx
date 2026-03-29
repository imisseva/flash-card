import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { X } from "lucide-react"

export function CreateDeck({ onSave, onClose }) {
  const [deckName, setDeckName] = React.useState("")

  const handleCreate = (e) => {
    e.preventDefault()
    if (!deckName.trim()) return
    
    // Gửi dữ liệu về Dashboard
    onSave({
      title: deckName,
      cards: [], // Khởi tạo mảng rỗng theo hướng B
      learned: 0,
      color: "blue" // Màu mặc định
    })
    setDeckName("")
  }

  return (
    <Card className="relative mx-auto w-full max-w-sm border-none ring-0 shadow-2xl bg-white overflow-hidden">
      {/* Nút X tối giản - Đã căn chỉnh lại tọa độ */}
      <button 
        onClick={onClose}
        type="button"
        className="absolute right-4 top-4 p-1 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none"
      >
        <X className="h-4 w-4 text-slate-500" />
        <span className="sr-only">Close</span>
      </button>

      <CardHeader className="pt-8 pb-4">
        {/* Đã bỏ icon theo yêu cầu */}
        <CardTitle className="text-2xl font-bold text-slate-950">
          New Deck
        </CardTitle>
        <CardDescription className="text-slate-500 text-sm">
          Đặt tên cho bộ thẻ mới để bắt đầu học tập chuyên ngành.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleCreate}>
        <CardContent className="space-y-4 pb-6">
          <div className="grid gap-2">
            <Label htmlFor="deck-name" className="text-sm font-semibold text-slate-700">
              Tên bộ thẻ
            </Label>
            <Input 
              id="deck-name" 
              placeholder="Ví dụ: Web Development..." 
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              autoFocus
              className="h-11 border-slate-200 focus-visible:ring-slate-950 focus-visible:ring-1"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 pb-8">
          {/* Nút màu đen chuẩn tối giản */}
          <Button 
            type="submit" 
            className="w-full h-11 bg-slate-950 hover:bg-slate-800 text-white font-bold transition-all active:scale-[0.98]"
          >
            Tạo bộ thẻ
          </Button>
          <Button 
            variant="ghost" 
            type="button" 
            onClick={onClose} 
            className="w-full h-10 text-slate-500 hover:bg-slate-100 font-medium"
          >
            Hủy bỏ
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}