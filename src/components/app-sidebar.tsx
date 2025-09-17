"use client"

import * as React from "react"
import {
  IconChartPie,
  IconExchange,
  IconHistory,
  IconSettings,
} from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type PageType = 'overview' | 'trade' | 'history' | 'settings' | 'test';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onPageChange?: (page: PageType) => void;
  currentPage?: PageType;
}

export function AppSidebar({ onPageChange, currentPage, ...props }: AppSidebarProps) {
  const pathname = usePathname()
  const user = {
    name: "OnePay User",
    email: "user@onepay.com",
    avatar: "/avatar/1.png",
  };

  const navMain = [
    {
      title: "Overview",
      url: "/dashboard/overview",
      icon: IconChartPie,
      key: "overview" as PageType,
      isActive: pathname?.startsWith("/dashboard/overview"),
    },
    {
      title: "Trade",
      url: "/dashboard/trade",
      icon: IconExchange,
      key: "trade" as PageType,
      isActive: pathname?.startsWith("/dashboard/trade"),
    },
    {
      title: "History",
      url: "/dashboard/history",
      icon: IconHistory,
      key: "history" as PageType,
      isActive: pathname?.startsWith("/dashboard/history"),
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
      key: "settings" as PageType,
      isActive: pathname?.startsWith("/dashboard/settings"),
    },
    {
      title: "Test",
      url: "/dashboard/test",
      icon: IconExchange,
      key: "test" as PageType,
      isActive: pathname?.startsWith("/dashboard/test"),
    },
  ];


  const handleNavClick = (key?: PageType) => {};

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <Image src="/images/onepay-light.png" alt="OnePay" width={16} height={16} />
                <span className="text-base font-semibold">OnePay</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} onNavClick={handleNavClick} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
