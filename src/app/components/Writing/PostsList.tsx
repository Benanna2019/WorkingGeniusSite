"use client";
import * as React from 'react'

import { ListContainer } from '@/app/components/ListDetail/ListContainer'
// import { useGetPostsQuery } from '~/graphql/types.generated'

import { LoadingSpinner } from '../LoadingSpinner'
import { PostListItem } from './PostListItem'
import { WritingTitlebar } from './WritingTitlebar'
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { WritingContext } from '../Providers';
import { useQueryState } from 'nuqs';

export function PostsList() {
    const { filter } = React.useContext(WritingContext)
    // console.log('filter', filter)
    const [scrollContainerRef, setScrollContainerRef] = React.useState<React.RefObject<HTMLDivElement> | null>(null)

    const posts = useQuery(api.posts.getPosts, { filter: { status: filter as "published" | "draft" } })

    // Handle loading state for posts query
    if (posts === undefined) {
        return (
            <ListContainer data-cy="posts-list" onRef={(ref) => setScrollContainerRef(ref as React.RefObject<HTMLDivElement>)}>
                {scrollContainerRef && <WritingTitlebar scrollContainerRef={scrollContainerRef} />}
                <div className="lg:space-y-1 lg:p-3">
                    <LoadingSpinner />
                </div>
            </ListContainer>
        )
    }

    return (
        <ListContainer data-cy="posts-list" onRef={(ref) => setScrollContainerRef(ref as React.RefObject<HTMLDivElement>)}>
            {scrollContainerRef && <WritingTitlebar scrollContainerRef={scrollContainerRef} />}

            <div key={filter} className="lg:space-y-1 lg:p-3">
                {posts?.map((post) => {
                    // const active = window.location.pathname === `/writing/${post.slug}`

                    return <PostListItem key={post.slug} post={post} active={false} />
                })}
            </div>
        </ListContainer>
    )
}
