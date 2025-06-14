import { AppSidebar } from "@/components/layout/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminLayout() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState<string>("");

  useEffect(() => {
    const cp = location.pathname;
    setCurrentPath(cp);
  }, [location]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-gray-100">
        <nav className="h-12 flex items-center justify-between fixed w-[-webkit-fill-available] border-b bg-white z-10">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-2" />
          </div>

          <NavUser />
        </nav>

        <section className={`${currentPath !== "/" ? "mt-14" : ""}`}>
          <Outlet />
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
