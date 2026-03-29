import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Giữ nguyên logic kiểm tra admin/admin của bạn
    if (email === "admin" && password === "admin") {
      alert("Đăng nhập thành công!");
      navigate("/dashboard"); 
    } else {
      alert("Tài khoản hoặc mật khẩu không đúng! (Gợi ý: admin/admin)");
    }
  };

  return (
    // Bao quanh bởi div flex để căn giữa tuyệt đối giống code dưới
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-sm shadow-lg bg-white">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account. <br />
            (Sử dụng <b>admin/admin</b> để test)
          </CardDescription>
          {/* Giữ lại phần CardAction/Sign Up của giao diện trên */}
          <div className="mt-2">
            <Button variant="link" className="p-0 h-auto text-sm">Sign Up</Button>
          </div>
        </CardHeader>
        
        <form onSubmit={handleLogin}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="admin"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-muted-foreground"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>
          </CardContent>

          {/* Đưa các nút vào CardFooter để đúng bố cục giao diện mẫu */}
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" type="button" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}