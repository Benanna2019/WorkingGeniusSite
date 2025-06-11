'use client'

import { SidebarProvider } from "../ui/sidebar";
import { SidebarInset } from "../ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import { TitleBar } from "../ListDetail/Titlebar";
import { NavUser } from "../nav-user";
import { User } from "@generated/prisma";
import { LayoutProps } from "rwsdk/router";

export function SiteLayout({ children, requestInfo }: LayoutProps) {
    return (
        <div className="relative flex h-full min-h-screen w-full">
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "350px",
                    } as React.CSSProperties
                }
            >
                <AppSidebar user={requestInfo?.ctx.user as User} />
                <SidebarInset>
                    {/* <TitleBar title="" scrollContainerRef={null} /> */}
                    <div className="flex flex-1">{children}</div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}