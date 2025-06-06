import * as React from 'react'
import { Plus, Radio } from 'lucide-react'

import { Button, buttonVariants } from '@/app/components/ui/button'
import { Dialog, DialogContent } from '@/app/components/ui/dialog'
import { TitleBar } from '@/app/components/ListDetail/Titlebar'
// import { useViewerQuery } from '~/graphql/types.generated'

import SegmentedControl from '../SegmentedController'
import { WritingContext } from './PostsList'
import { DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
// import { WritingSubscriptionForm } from './SubscriptionForm'

export function WritingTitlebar({ scrollContainerRef }: { scrollContainerRef: React.RefObject<HTMLDivElement | null> | null }) {
    // const { data } = useViewerQuery()

    function getAddButton() {
        // if (data?.viewer?.isAdmin) {
        //     return (
        //         <a
        //             className={buttonVariants({ variant: "ghost" })}
        //             href="/writing/new"
        //             data-cy="new-post-button"
        //             aria-label="Add post"
        //         >
        //             <Plus size={16} />
        //         </a>
        //     )
        // }
        return null
    }

    function getSubscribeButton() {
        // if (data?.viewer?.isAdmin) return null
        return (
            <Dialog>
                <DialogTrigger>
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
                {getSubscribeButton()}
                {getAddButton()}
            </div>
        )
    }

    function getChildren() {
        // const { data } = useViewerQuery()
        const { setFilter, filter } = React.useContext(WritingContext)
        // if (data?.viewer?.isAdmin) {
        return (
            <div className="pt-2 pb-1">
                <SegmentedControl
                    onSetActiveItem={setFilter}
                    active={filter}
                    items={[
                        { id: 'published', label: 'Published' },
                        { id: 'draft', label: 'Drafts' },
                    ]}
                />
            </div>
        )
        // }
        return null
    }

    return (
        <TitleBar
            trailingAccessory={trailingAccessory()}
            title="Writing"
            scrollContainerRef={scrollContainerRef as React.RefObject<HTMLDivElement> | null}
        >
            {getChildren()}
        </TitleBar>
    )
}