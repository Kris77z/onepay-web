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
  const user = {
    name: "OnePay User",
    email: "user@onepay.com",
    avatar: "/avatar/1.png",
  };

  const navMain = [
    {
      title: "Overview",
      url: "#",
      icon: IconChartPie,
      key: "overview" as PageType,
      isActive: currentPage === "overview",
    },
    {
      title: "Trade",
      url: "#",
      icon: IconExchange,
      key: "trade" as PageType,
      isActive: currentPage === "trade",
    },
    {
      title: "History",
      url: "#",
      icon: IconHistory,
      key: "history" as PageType,
      isActive: currentPage === "history",
    },
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
      key: "settings" as PageType,
      isActive: currentPage === "settings",
    },
    {
      title: "Test",
      url: "#",
      icon: IconExchange,
      key: "test" as PageType,
      isActive: currentPage === "test",
    },
  ];


  const handleNavClick = (key?: PageType) => {
    if (key && onPageChange) {
      onPageChange(key);
    }
  };

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
