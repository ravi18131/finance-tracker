import { Cog, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useSession } from "@/store/session.store";

export function NavUser() {
  const { user, logoutUser } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="default"
          className="w-auto hover:bg-transparent active:bg-transparent mr-2"
        >
          <Avatar className="h-8 w-8 rounded-full">
            <AvatarImage src={user?.avatar} alt={user?.full_name} />
            <AvatarFallback className="rounded-full bg-white">
              <span>{user?.full_name?.charAt(0).toUpperCase() || "U"}</span>
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-none text-white">
            <p className="truncate text-sm font-semibold mb-0">
              {user?.full_name}
            </p>
            <p className="truncate text-xs -mt-1">{user?.email}</p>
          </div>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-full">
              <AvatarImage src={user?.avatar} alt={user?.full_name} />
              <AvatarFallback className="rounded-full">
                <span>{user?.full_name?.charAt(0).toUpperCase() || "U"}</span>
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user?.full_name}</span>
              <span className="truncate text-xs">{user?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/admin">
            <DropdownMenuItem>
              <Cog />
              Settings
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logoutUser}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
