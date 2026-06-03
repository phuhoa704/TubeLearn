import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, ChatPanel } from "../components";
import { Navbar } from "../components/Navbar";

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [role] = useState<"student" | "prof">(() => {
    const saved = localStorage.getItem("user-role");
    return saved === "student" || saved === "prof" ? saved : "student";
  });

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background-main text-text-main font-sans transition-colors duration-200">
      <Sidebar collapsed={collapsed} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-background-main p-6 md:p-8 transition-colors duration-200">
          <div className="max-w-7xl mx-auto animate-fade-up">
            <Outlet context={{ role }} />
          </div>
        </main>
      </div>

      <ChatPanel />
    </div>
  );
}
