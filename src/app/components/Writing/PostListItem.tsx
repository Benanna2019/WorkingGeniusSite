import * as React from 'react'

import { ListItem } from '@/app/components/ListDetail/ListItem'
// import { Post } from '~/graphql/types.generated'
import { timestampToCleanTime } from '@/app/lib/utils'

interface Props {
    post: any // FIX: Post
    active: boolean
}

export const PostListItem = React.memo<Props>(({ post, active }) => {
    const publishedAt = timestampToCleanTime({ timestamp: post.publishedAt })
    return (
        <ListItem
            key={post.id}
            href="/writing/[slug]"
            title={post.title}
            description={null}
            byline={post.publishedAt ? publishedAt.formatted : 'Draft'}
            active={active}
        />
    )
})