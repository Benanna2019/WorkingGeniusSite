import * as React from 'react'
import { Plus, Radio } from 'lucide-react'

import { Button, buttonVariants } from '@/app/components/ui/button'
import { Dialog, DialogContent } from '@/app/components/ui/dialog'
import { TitleBar } from '@/app/components/ListDetail/Titlebar'
// import { useViewerQuery } from '~/graphql/types.generated'

import SegmentedControl from '../SegmentedController'
import { WritingContext } from '../Providers'
import { DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import { ClientInteractiveControls } from '../SegmentedController/ClientInteractiveControls'
import { useViewerQuery } from '@/app/hooks/use-viewer-query'
import { usePreserveSearchParams } from '@/app/lib/utils'
// import { WritingSubscriptionForm } from './SubscriptionForm'

interface Props {
    scrollContainerRef: React.RefObject<HTMLDivElement>
}

export function WritingTitlebar({ scrollContainerRef }: Props) {
    const user = useViewerQuery()
    const { filter } = React.useContext(WritingContext)
    const preservedNewPostHref = usePreserveSearchParams('/writing/new')

    function getAddButton() {
        if (user?.role === "admin") {
            return (
                <a
                    className={buttonVariants({ variant: "ghost" })}
                    href={preservedNewPostHref}
                    data-cy="new-post-button"
                    aria-label="Add post"
                >
                    <Plus size={16} />
                </a>
            )
        }
        return null
    }

    function getSubscribeButton() {
        if (user?.role === "admin") return null
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button data-cy="open-subscribe-hn-dialog" size="sm">
                        <Radio size={16} />
                        <span>Subscribe</span>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Newsletter</DialogTitle>
                    <DialogDescription>
                        <p>Subscribe to the newsletter to get the latest news and updates.</p>
                        {/* <WritingSubscriptionForm /> */}
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        )
    }

    function trailingAccessory() {
        return (
            <div className="flex space-x-2">
                {/* {getSubscribeButton()} */}
                {getAddButton()}
            </div>
        )
    }

    function getChildren() {
        if (user?.role === "admin") {
            return (
                <div className="pt-2 pb-1">
                    <ClientInteractiveControls />
                </div>
            )
        }
        return null
    }

    return (
        <TitleBar
            trailingAccessory={trailingAccessory()}
            title="Writing"
            scrollContainerRef={scrollContainerRef}
        >
            {getChildren()}
        </TitleBar>
    )
}