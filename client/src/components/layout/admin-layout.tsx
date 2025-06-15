import { AppSidebar } from "@/components/layout/admin/app-sidebar";
import { AdminHeader } from "@/components/layout/admin/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar variant="sidebar" />
      <SidebarInset>
        <AdminHeader />
        <div className="p-4 pmd:p-6 h-full overflow-auto bg-muted">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
