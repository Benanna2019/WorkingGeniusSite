"use client"
import * as React from 'react'

import { LoadingSpinner } from '@/app/components/LoadingSpinner'
// import { useEditPostMutation } from '~/graphql/types.generated'
// import useInterval from '~/hooks/useInterval'

import { PostEditorContext } from '@/app/components/Providers'
import useInterval from '@/app/hooks/use-interval'

export function PostEditorAutoSave() {
    const context = React.useContext(PostEditorContext)
    const { draftState, existingPost } = context
    const { title, text, slug, excerpt } = draftState
    // const [editPost, { loading }] = useEditPostMutation()

    // auto save every 30 seconds
    useInterval(() => {
        if (!existingPost?.id) return

        // editPost({
        //     variables: {
        //         id: existingPost.id,
        //         data: { title, text, slug, excerpt },
        //     },
        // })
    }, 30000)

    return <></>
    // return <>{loading && <LoadingSpinner />}</>
}