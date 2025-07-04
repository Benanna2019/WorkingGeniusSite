import * as React from 'react'

import { Sidebar } from '@/app/components/Sidebar'
import { LayoutProps } from 'rwsdk/router'
import { Providers } from '../Providers'
interface Props {
    list: React.ReactElement | null
    detail: React.ReactElement | null
    hasDetail?: boolean
}

export function ListDetailView({ list, detail, hasDetail = false }: Props) {
    return (
        <div className="flex w-full">
            {list && (
                <div
                    id="list"
                    className={`bg-dots ${hasDetail ? 'hidden lg:flex' : 'min-h-screen w-full'
                        }`}
                >
                    {list}
                </div>
            )}
            {detail}
        </div>
    )
}

export function SiteLayout({ children, requestInfo }: LayoutProps) {
    return (
        <div className="relative flex h-full min-h-screen w-full">
            <Providers>

                <Sidebar />

                <div className="flex flex-1">{children}</div>
            </Providers>
        </div>
    )
}