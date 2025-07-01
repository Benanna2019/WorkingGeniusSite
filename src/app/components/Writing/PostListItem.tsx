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
            key={post.slug}
            href={`/writing/${post.slug}`}
            title={post.title}
            description={post.description}
            byline={post.publishedAt ? publishedAt.formatted : 'Draft'}
            active={active}
        />
    )
})