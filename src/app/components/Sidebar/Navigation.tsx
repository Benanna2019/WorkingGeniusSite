'use client'
import {
    AppDissectionIcon,
    BookmarksIcon,
    ExternalLinkIcon,
    GitHubIcon,
    HomeIcon,
    PodcastIcon,
    TwitterIcon,
    WritingIcon,
    YouTubeIcon,
} from '@/app/components/Icon'

import { NavigationLink } from './NavigationLink'

export function SidebarNavigation() {
    const pathname = "/" //window?.location?.pathname
    const sections = [
        {
            label: null,
            items: [
                {
                    href: '/',
                    label: 'Home',
                    icon: HomeIcon,
                    trailingAccessory: null,
                    isActive: pathname === '/',
                    trailingAction: null,
                    isExternal: false,
                },

                {
                    href: '/writing',
                    label: 'Writing',
                    icon: WritingIcon,
                    trailingAccessory: null,
                    isActive: pathname.indexOf('/writing') >= 0,
                    trailingAction: null,
                    isExternal: false,
                },
            ],
        },
        // {
        //     label: 'Me',
        //     items: [
        //         {
        //             href: '/bookmarks',
        //             label: 'Bookmarks',
        //             icon: BookmarksIcon,
        //             trailingAccessory: null,
        //             isActive: pathname.indexOf('/bookmarks') >= 0,
        //             trailingAction: null,
        //             isExternal: false,
        //         },

        //         {
        //             href: '/ama',
        //             label: 'AMA',
        //             icon: AMAIcon,
        //             trailingAccessory: null,
        //             isActive:
        //                 pathname.indexOf('/ama') >= 0 &&
        //                 !pathname.startsWith('/ama/pending'),
        //             trailingAction: null,
        //             isExternal: false,
        //         },

        //         {
        //             href: '/stack',
        //             label: 'Stack',
        //             icon: StackIcon,
        //             trailingAccessory: null,
        //             isActive: router.asPath.indexOf('/stack') >= 0,
        //             trailingAction: null,
        //             isExternal: false,
        //         },
        //     ],
        // },
        // {
        //     label: 'Projects',
        //     items: [
        //         {
        //             href: 'https://campsite.co',
        //             label: 'Campsite',
        //             icon: CampsiteIcon,
        //             trailingAccessory: ExternalLinkIcon,
        //             isActive: false,
        //             trailingAction: null,
        //             isExternal: true,
        //         },

        //         {
        //             href: 'https://designdetails.fm',
        //             label: 'Design Details',
        //             icon: PodcastIcon,
        //             trailingAccessory: ExternalLinkIcon,
        //             isActive: false,
        //             trailingAction: null,
        //             isExternal: true,
        //         },

        //         {
        //             href: 'https://staff.design',
        //             label: 'Staff Design',
        //             icon: StaffDesignIcon,
        //             trailingAccessory: ExternalLinkIcon,
        //             isActive: false,
        //             trailingAction: null,
        //             isExternal: true,
        //         },

        //         {
        //             href: 'https://figma.com/@brian',
        //             label: 'Figma Plugins',
        //             icon: FigmaIcon,
        //             trailingAccessory: ExternalLinkIcon,
        //             isActive: false,
        //             trailingAction: null,
        //             isExternal: true,
        //         },

        //         {
        //             href: '/security',
        //             label: 'Security Checklist',
        //             icon: SecurityChecklistIcon,
        //             trailingAccessory: null,
        //             isActive: router.asPath.indexOf('/security') >= 0,
        //             trailingAction: null,
        //             isExternal: false,
        //         },

        //         {
        //             href: '/hn',
        //             label: 'Hacker News',
        //             icon: HackerNewsIcon,
        //             trailingAccessory: null,
        //             isActive: router.asPath.indexOf('/hn') >= 0,
        //             trailingAction: null,
        //             isExternal: false,
        //         },

        //         {
        //             href: '/app-dissection',
        //             label: 'App Dissection',
        //             icon: AppDissectionIcon,
        //             trailingAccessory: null,
        //             isActive: router.asPath.indexOf('/app-dissection') >= 0,
        //             trailingAction: null,
        //             isExternal: false,
        //         },
        //     ],
        // },
        // {
        //     label: 'Online',
        //     items: [
        //         {
        //             href: 'https://twitter.com/brian_lovin',
        //             label: 'Twitter',
        //             icon: TwitterIcon,
        //             trailingAccessory: ExternalLinkIcon,
        //             isActive: false,
        //             trailingAction: null,
        //             isExternal: true,
        //         },

        //         {
        //             href: 'https://www.youtube.com/channel/UC-esBYEUGQ6iK1wmw76f5MA',
        //             label: 'YouTube',
        //             icon: YouTubeIcon,
        //             trailingAccessory: ExternalLinkIcon,
        //             isActive: false,
        //             trailingAction: null,
        //             isExternal: true,
        //         },

        //         {
        //             href: 'https://github.com/brianlovin',
        //             label: 'GitHub',
        //             icon: GitHubIcon,
        //             trailingAccessory: ExternalLinkIcon,
        //             isActive: false,
        //             trailingAction: null,
        //             isExternal: true,
        //         },

        //         {
        //             href: 'https://figma.com/@brian',
        //             label: 'Figma',
        //             icon: FigmaIcon,
        //             trailingAccessory: ExternalLinkIcon,
        //             isActive: false,
        //             trailingAction: null,
        //             isExternal: true,
        //         },
        //     ],
        // },
    ]

    return (
        <div className="flex-1 px-3 py-3 space-y-1">
            {sections.map((section, i) => {
                return (
                    <ul key={i} className="space-y-1">
                        {section.label && (
                            <h4
                                key={i}
                                className="px-2 pt-5 pb-2 text-xs font-semibold text-gray-1000 text-opacity-40 dark:text-white"
                            >
                                {section.label}
                            </h4>
                        )}
                        {section.items.map((item, j) => (
                            <NavigationLink key={j} link={item} />
                        ))}
                    </ul>
                )
            })}
        </div>
    )
}