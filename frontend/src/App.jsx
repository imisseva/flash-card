import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import ViewDeck from "./pages/ViewDeck";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./components/layout/AppLayout";
import { DecksProvider } from "./context/DecksContext";

function App() {
  return (
    <BrowserRouter>
      <DecksProvider>
        <Routes>
          {/* Chuyển hướng đường dẫn gốc về Login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Trang Login */}
          <Route path="/login" element={<Login />} />

          {/* Layout cố định sidebar cho các trang chính */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/view-deck" element={<ViewDeck />} />
          </Route>

          {/* Nếu user vào đường dẫn lạ, tự động chuyển về /login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </DecksProvider>
    </BrowserRouter>
  );
}

export default App;