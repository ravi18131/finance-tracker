import * as React from "react";
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  BookOpen,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HelpCircleIcon,
  Home,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  User,
  UsersIcon,
} from "lucide-react";

import { NavDocuments } from "@/components/layout/admin/nav-documents";
import { NavMain } from "@/components/layout/admin/nav-main";
import { NavSecondary } from "@/components/layout/admin/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { NavUser } from "./nav-user";
import NavMenu from "./nav-menu";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMenu: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/admin",
          icon: LayoutDashboardIcon,
        },
        {
          title: "Users",
          icon: UsersIcon,
          url: "/admin/users",
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
          icon: BarChartIcon,
        },
        {
          title: "Documents",
          icon: BookOpen,
          url: "/dashboard/documents",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/" className="p-4 pl-0">
                <img src="/images/fintrack_logo.png" alt=" FinTrack" className="w-48 h-auto" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMenu items={data.navMenu} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
