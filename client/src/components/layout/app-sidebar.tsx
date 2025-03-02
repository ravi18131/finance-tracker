import * as React from "react";

import { MainNav } from "@/components/layout/main-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  main_nav: [
    {
      name: "All flies",
      url: "/",
    },
    {
      name: "Sales & Marketing",
      url: "#",
    },
    {
      name: "Travel",
      url: "#",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="bg-primary bg-center bg-cover"
    >
      <SidebarHeader>
        {/* <img src="/images/admin-logo.png" className="w-52 mx-auto p-3" /> */}
        <h1 className="text-2xl text-center font-bold text-primary mt- text-white my-5">
          AMCE
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <MainNav projects={data.main_nav} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
