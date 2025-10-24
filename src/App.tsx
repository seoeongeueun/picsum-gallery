import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import DetailLayout from "@/layouts/DetailLayout";
import DetailPage from "@/components/Detail/page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/image/:id" element={<DetailLayout />}>
          <Route index element={<DetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
