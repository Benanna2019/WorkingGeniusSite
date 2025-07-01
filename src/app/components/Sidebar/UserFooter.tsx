import * as React from 'react'
import { Settings } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import { Button, buttonVariants } from '@/app/components/ui/button'
import { LoadingSpinner } from '@/app/components/LoadingSpinner'
// import { useViewerQuery } from '@/app/graphql/types.generated'
// import { authik } from '@/app/lib/authik/client'


import { GlobalNavigationContext } from '../Providers'
import { useAuthActions } from '@convex-dev/auth/react'
import { useConvexAuth } from 'convex/react'
import { GitHubIcon } from '../Icon'
import { api } from '../../../../convex/_generated/api'
import { useQuery } from 'convex/react'
import { useViewerQuery } from '@/app/hooks/use-viewer-query'

function Container(props: any) {
    return (
        <div
            data-cy="sign-in-button"
            className="filter-blur sticky bottom-0 z-10 flex items-center justify-between space-x-3 border-t border-gray-150 bg-white bg-opacity-80 p-2 dark:border-gray-800 dark:bg-gray-900 dark:bg-opacity-60"
            {...props}
        />
    )
}

export function UserFooter() {
    const { setIsOpen } = React.useContext(GlobalNavigationContext)
    const { signIn, signOut } = useAuthActions();
    const { isAuthenticated, isLoading } = useConvexAuth();
    const user = useViewerQuery();

    function signInButton() {
        return (
            <Button
                variant="ghost"
                onClick={() => signIn("github")}
                style={{ width: '100%' }}
            >
                <GitHubIcon width="20" height="20" />
            </Button>
        )
    }

    if (isLoading) {
        return (
            <Container>
                <div className="flex w-full items-center justify-center py-1">
                    <LoadingSpinner />
                </div>
            </Container>
        )
    }

    if (!isAuthenticated) {
        return <Container>{signInButton()}</Container>
    }

    if (isAuthenticated) {
        return (
            <Container>
                <a href={`/u/${user?.name}`}>
                    <span
                        onClick={() => setIsOpen(false)}
                        className="flex flex-none items-center rounded-full"
                    >
                        <Avatar
                            className="rounded-full"
                        >
                            <AvatarImage src={user?.image} />
                            <AvatarFallback>
                                {user?.name?.slice(0, 1)}
                            </AvatarFallback>
                        </Avatar>
                    </span>
                </a>
                <span
                    className={buttonVariants({ variant: 'ghost', size: 'icon' })}
                    aria-label="Manage settings"
                    onClick={() => {
                        setIsOpen(false)
                        void signOut()
                    }}
                >
                    <Settings size={16} />
                </span>
            </Container>
        )
    } else {
        return <Container>{signInButton()}</Container>
    }
}