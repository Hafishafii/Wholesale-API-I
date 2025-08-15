import React, { useState } from "react";
import type { ReactNode } from "react";
import Topbar from "../../features/Topbar";
import Sidebar from "../../features/password/Sidebar";

interface MainLayoutProps {
  title?: string;
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
  const [_showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar onMenuClick={() => setShowSidebar(true)} title={title} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-100 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
