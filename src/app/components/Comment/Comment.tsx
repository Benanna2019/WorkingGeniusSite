// import Link from 'next/link'
import * as React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import { Button } from '@/app/components/ui/button'
import { Textarea } from '@/app/components/ui/textarea'
import { LoadingSpinner } from '@/app/components/LoadingSpinner'
// import { GET_COMMENTS } from '~/graphql/queries/comments'
// import {
//     Comment as CommentProp,
//     CommentType,
//     useDeleteCommentMutation,
//     useEditCommentMutation,
// } from '~/graphql/types.generated'
import { timestampToCleanTime } from '@/app/lib/utils'

import { MarkdownRenderer } from '../MarkdownRenderer'
import { CommentMenu } from './CommentMenu'

interface Props {
    comment: any // FIX: CommentProp
    refId: string
    type: any // FIX: CommentType
}

export const Comment = React.memo(function MemoComment({
    comment,
    refId,
    type,
}: Props) {
    const [isEditing, setIsEditing] = React.useState(false)
    const [editText, setEditText] = React.useState(comment.text)
    const [isSavingEdit, setIsSavingEdit] = React.useState(false)

    // const [deleteComment] = useDeleteCommentMutation({
    //     variables: { id: comment.id },
    //     optimisticResponse: {
    //         __typename: 'Mutation',
    //         deleteComment: true,
    //     },
    //     update(cache) {
    //         const { comments } = cache.readQuery({
    //             query: GET_COMMENTS,
    //             variables: { refId, type },
    //         })

    //         cache.writeQuery({
    //             query: GET_COMMENTS,
    //             variables: { refId, type },
    //             data: {
    //                 comments: comments.filter((o) => o.id !== comment.id),
    //             },
    //         })
    //     },
    //     onError(error) { },
    // })

    // const [editComment] = useEditCommentMutation({
    //     variables: { id: comment.id, text: editText },
    //     optimisticResponse: {
    //         __typename: 'Mutation',
    //         editComment: {
    //             __typename: 'Comment',
    //             ...comment,
    //             text: editText,
    //             author: {
    //                 ...comment.author,
    //                 __typename: 'User',
    //             },
    //         },
    //     },
    //     onError(error) { },
    //     onCompleted() {
    //         setIsSavingEdit(false)
    //         setIsEditing(false)
    //     },
    // })

    // function handleDelete() {
    //     deleteComment()
    // }

    // function handleEdit() {
    //     setIsEditing(true)
    // }

    function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.keyCode === 13 && e.metaKey) {
            if (editText.trim().length === 0 || isSavingEdit) return
            return handleSaveEdit()
        }
        if (e.keyCode === 27 || e.key === 'Escape') {
            setIsEditing(false)
            setEditText(comment.text)
        }
    }

    function handleSaveEdit() {
        setIsSavingEdit(true)
        // editComment()
    }

    const createdAt = timestampToCleanTime({
        month: 'short',
        timestamp: comment.createdAt,
    })

    return (
        <div className="group flex flex-col space-y-0">
            <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                    <a href={`/u/${comment.author.username}`}>
                        <a className="inline-flex">
                            <Avatar>
                                <AvatarImage src={comment.author.avatar} />
                                <AvatarFallback>{comment.author.username.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                        </a>
                    </a>

                    <div className="flex space-x-1">
                        <a href={`/u/${comment.author.username}`} className="text-primary font-semibold leading-snug">
                            <div className="flex break-all line-clamp-1">
                                {comment.author.name}
                            </div>
                        </a>
                        <p className="text-quaternary leading-snug">·</p>
                        <p
                            className="text-quaternary leading-snug line-clamp-1"
                            title={createdAt.raw}
                        >
                            {createdAt.formatted}
                        </p>
                    </div>
                </div>

                {(comment.viewerCanDelete || comment.viewerCanEdit) && (
                    <CommentMenu
                        comment={comment}
                        handleDelete={() => { }}
                        handleEdit={() => { }}
                    // handleDelete={handleDelete}
                    // handleEdit={handleEdit}
                    />
                )}
            </div>

            {isEditing ? (
                <div className="flex flex-col space-y-3 pl-14">
                    <Textarea
                        onChange={(e) => setEditText(e.target.value)}
                        value={editText}
                        onKeyDown={onKeyDown}
                    />
                    <div className="flex justify-between">
                        <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button
                            disabled={editText.trim().length === 0 || isSavingEdit}
                            onClick={handleSaveEdit}
                        >
                            {isSavingEdit ? <LoadingSpinner /> : 'Save'}
                        </Button>
                    </div>
                </div>
            ) : (
                <MarkdownRenderer
                    children={comment.text}
                    className="comment prose flex-grow pl-14 leading-normal"
                    variant="comment"
                />
            )}
        </div>
    )
})