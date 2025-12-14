import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
