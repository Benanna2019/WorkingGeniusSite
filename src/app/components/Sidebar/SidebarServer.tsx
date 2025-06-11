// Server Component - No 'use client' directive
import { TitleBar } from '@/app/components/ListDetail/Titlebar'
import { SidebarClient } from '@/app/components/Sidebar/SidebarClient'
import { NavUserServer } from '@/app/components/Sidebar/NavUserServer'

interface SidebarServerProps {
    user?: {
        id: string
        name?: string | null
        email?: string | null
        image?: string | null
    } | null
}

// Navigation items - could come from a database or config
const navigationItems = [
    {
        href: '/',
        label: 'Home',
        icon: 'HomeIcon',
        isActive: false, // This would be determined server-side based on current path
        isExternal: false,
    },
    {
        href: '/writing',
        label: 'Writing',
        icon: 'WritingIcon',
        isActive: false,
        isExternal: false,
    },
]

export function SidebarServer({ user }: SidebarServerProps) {
    return (
        <>
            {/* Static sidebar structure - rendered on server */}
            <nav
                data-sidebar-nav
                className="3xl:w-80 z-30 flex h-full max-h-screen min-h-screen w-3/4 flex-none transform flex-col overflow-y-auto border-r border-gray-150 bg-white pb-10 transition duration-200 ease-in-out dark:border-gray-800 dark:bg-gray-900 sm:w-1/2 sm:pb-0 md:w-1/3 lg:relative lg:z-auto lg:w-56 lg:translate-x-0 lg:bg-gray-50 lg:dark:bg-gray-900 2xl:w-72 absolute -translate-x-full"
            >

                <TitleBar
                    scrollContainerRef={null}
                    leadingAccessory={null}
                    title="Brian Lovin"
                />

                {/* Static navigation structure */}
                <div className="flex-1 px-3 py-3 space-y-1">
                    <ul className="space-y-1">
                        {navigationItems.map((item, index) => (
                            <li key={index} className="flex items-stretch space-x-1">
                                <a
                                    href={item.href}
                                    target={item.isExternal ? '_blank' : undefined}
                                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                                    className={`flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-medium ${item.isActive
                                        ? 'bg-black text-white hover:bg-black hover:text-white dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white'
                                        : 'text-gray-700 dark:text-gray-200 sm:hover:bg-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:dark:hover:text-gray-200'
                                        }`}
                                >
                                    <span className="flex items-center justify-center w-4">
                                        {/* Icon would go here - simplified for now */}
                                        <div className="w-4 h-4 bg-gray-400 rounded"></div>
                                    </span>
                                    <span className="flex-1">{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* User section at bottom */}
                {user && <NavUserServer user={user} />}
            </nav>

            {/* Client-side enhancements for mobile toggle, overlay, etc. */}
            <SidebarClient />
        </>
    )
} 