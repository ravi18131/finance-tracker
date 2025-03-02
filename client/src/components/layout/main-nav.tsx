import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function MainNav({
  projects,
}: {
  projects: {
    name: string;
    url: string;
  }[];
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden mt-5">
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem
            key={item.name}
            className="text-white hover:text-black"
          >
            <SidebarMenuButton asChild>
              <Link to={item.url}>
                <div className="w-full flex justify-between items-center">
                  <p className=" font-semibold">{item.name}</p>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
