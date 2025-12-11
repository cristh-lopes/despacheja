"use client";

import * as React from "react";
import {
  IconBuildingCog,
  IconCashRegister,
  IconChartBar,
  IconDashboard,
  IconForms,
  IconHelp,
  IconSearch,
  IconSettings,
  IconUserSearch,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { HorizontalLogo } from "./logo-horizontal";

const data = {
  user: {
    name: "Cristhian Despachante",
    email: "cristhian.despachate@gmail.com",
    avatar: "/logoDespachante.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Serviços",
      url: "/servicos",
      icon: IconForms,
    },
    {
      title: "Despesas",
      url: "#",
      icon: IconCashRegister,
    },
    {
      title: "Clientes",
      url: "#",
      icon: IconUserSearch,
    },
    {
      title: "Análise",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Seu Negócio",
      url: "#",
      icon: IconBuildingCog,
    },
  ],
  navSecondary: [
    {
      title: "Configurações",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Posso ajudar?",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Pesquisar",
      url: "#",
      icon: IconSearch,
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
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/dashboard">
                <HorizontalLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
