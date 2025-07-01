import * as React from 'react'

import { Button, buttonVariants } from '@/app/components/ui/button'
import { MoreHorizontal, Trash2, Edit } from 'lucide-react'
import { usePreserveSearchParams } from '@/app/lib/utils'
// import { ReactionButton } from '@/app/components/Button/ReactionButton'
// import { GET_POST } from '~/graphql/queries/posts'
// import {
//     ReactionType,
//     useToggleReactionMutation,
//     useViewerQuery,
// } from '~/graphql/types.generated'

// function getReactionButton(post) {
//     const [toggleReaction, { loading }] = useToggleReactionMutation()
//     function handleClick() {
//         if (loading) return

//         toggleReaction({
//             variables: {
//                 refId: post.id,
//                 type: ReactionType.Post,
//             },
//             optimisticResponse: {
//                 __typename: 'Mutation',
//                 toggleReaction: {
//                     __typename: 'Post',
//                     ...post,
//                     reactionCount: post.viewerHasReacted
//                         ? post.reactionCount - 1
//                         : post.reactionCount + 1,
//                     viewerHasReacted: !post.viewerHasReacted,
//                 },
//             },
//             update(cache, { data: { toggleReaction } }) {
//                 cache.writeQuery({
//                     query: GET_POST,
//                     variables: { id: post.id },
//                     data: {
//                         post: {
//                             ...post,
//                             ...toggleReaction,
//                         },
//                     },
//                 })
//             },
//         })
//     }

//     return (
//         <ReactionButton
//             id={post.id}
//             loading={loading}
//             count={post.reactionCount}
//             hasReacted={post.viewerHasReacted}
//             onClick={handleClick}
//         />
//     )
// }

export function PostActions({ post }: { post: any }) {
    const preservedEditHref = usePreserveSearchParams(`/writing/${post.slug}/edit`)

    return (
        <div className="flex items-center space-x-2">
            {/* {getReactionButton(post)} */}
            <a className={buttonVariants({ variant: 'link' })} href={preservedEditHref}>
                <Edit size={16} />
            </a>
        </div>
    )
}