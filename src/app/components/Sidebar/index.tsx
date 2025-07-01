'use client'

import * as React from 'react'

import { TitleBar } from '@/app/components/ListDetail/Titlebar'
import { GlobalNavigationContext } from '@/app/components/Providers'

import { SidebarNavigation } from './Navigation'
import { SidebarOverlay } from './Overlay'

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { UserFooter } from './UserFooter'

export function Sidebar() {
    const { isOpen } = React.useContext(GlobalNavigationContext)
    const scrollContainerRef = React.useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>
    const tasks = useQuery(api.tasks.get);

    console.log('tasks', tasks)

    return (
        <>
            <nav
                ref={scrollContainerRef}
                className={`${isOpen
                    ? 'absolute inset-y-0 left-0 translate-x-0 shadow-lg'
                    : 'absolute -translate-x-full'
                    } 3xl:w-80 z-30 flex h-full max-h-screen min-h-screen w-3/4 flex-none transform flex-col overflow-y-auto border-r border-gray-150 bg-white pb-10 transition duration-200 ease-in-out dark:border-gray-800 dark:bg-gray-900 sm:w-1/2 sm:pb-0 md:w-1/3 lg:relative lg:z-auto lg:w-56 lg:translate-x-0 lg:bg-gray-50 lg:dark:bg-gray-900 2xl:w-72 `}
            >
                <TitleBar
                    scrollContainerRef={scrollContainerRef}
                    leadingAccessory={null}
                    title="Working Genius"
                />
                <SidebarNavigation />
                <UserFooter />
            </nav>
            <SidebarOverlay />
        </>
    )
}