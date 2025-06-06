import { SidebarProvider } from "../ui/sidebar";
import { SidebarInset } from "../ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import { TitleBar } from "../ListDetail/Titlebar";
import { NavUser } from "../nav-user";
import { User } from "@generated/prisma";
import ClientAppShell from "./AppShell";

type SiteLayoutProps = {
    user: any; // or define a proper serializable user type
    children: React.ReactNode;
};

export function SiteLayout({ user, children }: SiteLayoutProps) {
    return (
        <div className="relative flex h-full min-h-screen w-full">
            <ClientAppShell>
                <SidebarProvider
                    style={
                        {
                            "--sidebar-width": "350px",
                        } as React.CSSProperties
                    }
                >
                    <AppSidebar>
                        <NavUser user={user as User} />
                    </AppSidebar>
                    <SidebarInset>
                        <TitleBar title="" scrollContainerRef={null} />
                        <div className="flex flex-1">{children}</div>
                    </SidebarInset>
                </SidebarProvider>
            </ClientAppShell>
        </div>

    )
}