"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Sidebar from "../Sidebar";
import Header from "../Header";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <div className="bg-white dark:bg-boxdark-2 dark:text-bodydark bg-[url('/images/others/bg-pattern.svg')] dark:bg-[url('/images/others/bg-pattern-dark.svg')]">
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          authStatus={status}
          userRoles={session?.user?.roles}
        />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            authStatus={status}
          />

          <main>
            <div
              className={`mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10`}
            >
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
