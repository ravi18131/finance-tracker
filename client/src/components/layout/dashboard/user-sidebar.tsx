import * as React from "react";
import {
    BookOpen,
    HelpCircleIcon,
    LayoutDashboardIcon,
    SearchIcon,
    SettingsIcon,
    UsersIcon,
} from "lucide-react";
import { NavSecondary } from "@/components/layout/dashboard/nav-secondary";
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
                    url: "/user",
                    icon: LayoutDashboardIcon,
                },
                {
                    title: "Transactions",
                    icon: BookOpen,
                    url: "/user/transactions",
                },
                {
                    title: "Profile",
                    icon: UsersIcon,
                    url: "/user/profile",
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

export function UserSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
