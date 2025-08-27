import React from "react"
import { useLocation, Link } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useSession } from "@/store/session.store"

export function AdminHeader() {
  const location = useLocation()
  const pathname = location.pathname

  const getBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean)
    return paths.map((path, index) => ({
      label: path.charAt(0).toUpperCase() + path.slice(1),
      href: "/" + paths.slice(0, index + 1).join("/"),
    }))
  }

  const { user } = useSession()
  if (!user) return null

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex w-full justify-between">
          <div className="flex w-full items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {getBreadcrumbs().map((crumb, index, arr) => {
                  const isLast = index === arr.length - 1
                  return (
                    <React.Fragment key={crumb.href}>
                      {isLast ? (
                        <BreadcrumbItem>
                          <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                        </BreadcrumbItem>
                      ) : (
                        <>
                          <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                              <Link to={crumb.href}>{crumb.label}</Link>
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator />
                        </>
                      )}
                    </React.Fragment>
                  )
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </header>
      <Separator />
    </div>
  )
}
