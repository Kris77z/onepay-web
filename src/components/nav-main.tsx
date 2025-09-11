"use client"

import { type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type PageType = 'overview' | 'trade' | 'history' | 'settings' | 'test';

export function NavMain({
  items,
  onNavClick,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
    key?: PageType
    isActive?: boolean
  }[]
  onNavClick?: (key?: PageType) => void
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={item.isActive}
                onClick={() => onNavClick?.(item.key)}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
