"use client";
import * as React from 'react'

import { ListContainer } from '@/app/components/ListDetail/ListContainer'
// import { useGetPostsQuery } from '~/graphql/types.generated'

import { LoadingSpinner } from '../LoadingSpinner'
import { PostListItem } from './PostListItem'
import { WritingTitlebar } from './WritingTitlebar'
import { Post } from '@generated/prisma'

export const WritingContext = React.createContext({
    filter: 'published',
    setFilter: (filter: string) => { },
})

export function PostsList({ posts }: { posts: Post[] }) {
    const [filter, setFilter] = React.useState('published')
    let [scrollContainerRef, setScrollContainerRef] = React.useState<React.RefObject<HTMLDivElement | null> | null>(null)

    const variables =
        filter === 'published'
            ? { filter: { published: true } }
            : { filter: { published: false } }

    // const { data, error, loading, refetch } = useGetPostsQuery({ variables })

    // React.useEffect(() => {
    //     refetch()
    // }, [filter])

    // if (error) {
    //     return (
    //         <ListContainer onRef={setScrollContainerRef}>
    //             <div />
    //         </ListContainer>
    //     )
    // }

    // if (loading && !data?.posts) {
    //     return (
    //         <ListContainer onRef={setScrollContainerRef}>
    //             <WritingTitlebar scrollContainerRef={scrollContainerRef} />
    //             <div className="flex flex-1 items-center justify-center">
    //                 <LoadingSpinner />
    //             </div>
    //         </ListContainer>
    //     )
    // }

    // const { posts } = data

    const defaultContextValue = {
        filter,
        setFilter,
    }

    return (
        <WritingContext.Provider value={defaultContextValue}>
            <ListContainer data-cy="posts-list" onRef={setScrollContainerRef}>
                <WritingTitlebar scrollContainerRef={scrollContainerRef} />

                <div className="lg:space-y-1 lg:p-3">
                    {posts.map((post) => {
                        // const active = router.query?.slug === post.slug

                        return <PostListItem key={post.id} post={post} active={false} />
                    })}
                </div>
            </ListContainer>
        </WritingContext.Provider>
    )
}