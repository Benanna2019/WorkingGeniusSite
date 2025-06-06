import * as React from 'react'
import { X } from 'lucide-react'

import { Button } from '@/app/components/ui/button'
import { Input, Textarea } from '@/app/components/Input'
import { TitleBar } from '@/app/components/ListDetail/Titlebar'
import { LoadingSpinner } from '@/app/components/LoadingSpinner'

// import { GET_POSTS } from '@/app/graphql/queries/posts'
// import {
//     useEditPostMutation,
//     useGetPostsQuery,
// } from '~/graphql/types.generated'

import { DraftState, PostEditorContext } from './PostEditor'

export function PostEditorMetaSidebar() {
    const context = React.useContext(PostEditorContext)
    const {
        draftState,
        existingPost,
        setDraftState,
        sidebarIsOpen,
        setSidebarIsOpen,
    } = context
    const scrollContainerRef = React.useRef<HTMLDivElement>(null as any)

    // const [editPost, { loading: editingPost }] = useEditPostMutation()

    // function handlePublish() {
    //     // if already publish, don't try to publish again
    //     if (existingPost.publishedAt) return

    //     return editPost({
    //         variables: {
    //             id: existingPost.id,
    //             data: { ...draftState, published: true },
    //         },
    //         refetchQueries: [GET_POSTS],
    //     })
    // }

    // function handleUnpublish() {
    //     // if it's not published already, don't try to unpublish
    //     if (!existingPost.publishedAt) return

    //     return editPost({
    //         variables: {
    //             id: existingPost.id,
    //             data: { ...draftState, published: false },
    //         },
    //         refetchQueries: [GET_POSTS],
    //     })
    // }

    function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
        return setDraftState((draft: DraftState) => ({ ...draft, slug: e.target.value }))
    }

    function handleExcerptChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        return setDraftState((draft: DraftState) => ({ ...draft, excerpt: e.target.value }))
    }

    return (
        <>
            <nav
                ref={scrollContainerRef}
                className={`${sidebarIsOpen
                    ? 'absolute inset-y-0 right-0 translate-x-0 shadow-lg'
                    : 'absolute right-0 translate-x-full'
                    } 3xl:w-80 z-30 flex h-full max-h-screen min-h-screen w-3/4 flex-none transform flex-col overflow-y-auto border-l border-gray-150 bg-white pb-10 transition duration-200 ease-in-out dark:border-gray-800 dark:bg-gray-900 sm:w-1/2 sm:pb-0 md:w-1/3 lg:w-56 2xl:w-72`}
            >
                <TitleBar
                    scrollContainerRef={scrollContainerRef}
                    leadingAccessory={null}
                    trailingAccessory={
                        <Button variant="ghost" size="sm" aria-label="Close details">
                            <X size={16} onClick={() => setSidebarIsOpen(false)} />
                        </Button>
                    }
                    globalMenu={false}
                    title="Details"
                />

                <div className="flex-1 space-y-4 px-3 py-3">
                    <div className="flex flex-col space-y-1">
                        <p className="text-primary text-sm font-semibold">Slug</p>
                        <Input
                            placeholder="Slug"
                            value={draftState.slug}
                            onChange={handleSlugChange}
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <p className="text-primary text-sm font-semibold">Excerpt</p>
                        <Textarea
                            value={draftState.excerpt}
                            placeholder="Excerpt"
                            rows={8}
                            maxRows={8}
                            onChange={handleExcerptChange}
                        />
                    </div>
                </div>

                <div className="filter-blur sticky bottom-0 z-10 flex items-center justify-between space-x-3 border-t border-gray-150 bg-white bg-opacity-80 p-2 dark:border-gray-800 dark:bg-gray-900 dark:bg-opacity-60">
                    {existingPost?.id && !existingPost?.publishedAt && (
                        <Button
                            style={{ width: '100%' }}
                        // disabled={editingPost}
                        // onClick={handlePublish}
                        >
                            {/* {editingPost ? <LoadingSpinner /> : 'Publish'} */}
                            Publish
                        </Button>
                    )}
                    {existingPost?.id && existingPost?.publishedAt && (
                        <Button
                            style={{ width: '100%' }}
                        // disabled={editingPost}
                        // onClick={handleUnpublish}
                        >
                            {/* {editingPost ? <LoadingSpinner /> : 'Unpublish'} */}
                            Unpublish
                        </Button>
                    )}
                </div>
            </nav>

            <div
                className={`fixed inset-0 z-20 bg-black bg-opacity-5 transition duration-200 ease-in-out dark:bg-opacity-50 ${sidebarIsOpen
                    ? 'pointer-events-auto opacity-100'
                    : 'pointer-events-none opacity-0'
                    }`}
                onClick={() => setSidebarIsOpen(false)}
            />
        </>
    )
}