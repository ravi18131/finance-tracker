import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NavMenu({
    items,
}: {
    items: {
        title: string
        url: string
        items?: {
            title: string
            url: string
            icon?: LucideIcon
            isActive?: boolean
        }[]
    }[]
}) {
    return (
        <SidebarMenu>
            {/* We create a SidebarGroup for each parent. */}
            {
                items.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items &&
                                    item.items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild isActive={item.isActive}>
                                                <Link to={item.url}>
                                                    {item.icon && <item.icon />}
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))
            }
        </SidebarMenu>
    )
}