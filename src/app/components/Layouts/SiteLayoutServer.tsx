// Server Component - No 'use client' directive
import { SidebarServer } from '@/app/components/Sidebar/SidebarServer'
import { LayoutProps } from "rwsdk/router";
import { User } from "@generated/prisma";

export function SiteLayoutServer({ children, requestInfo }: LayoutProps) {
    return (
        <div className="relative flex h-full min-h-screen w-full">
            <SidebarServer user={requestInfo?.ctx.user as User} />
            <main className="flex flex-1">
                {children}
            </main>
        </div>
    )
} 