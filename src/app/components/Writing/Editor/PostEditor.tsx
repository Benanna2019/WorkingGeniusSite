"use client"

import * as React from 'react'

import { Detail } from '@/app/components/ListDetail/Detail'
import { TitleBar } from '@/app/components/ListDetail/Titlebar'
// import { useGetPostQuery } from '@/app/graphql/types.generated'

import { PostEditorActions } from './PostEditorActions'
import { PostEditorComposer } from './PostEditorComposer'
import { PostEditorMetaSidebar } from './PostEditorMetaSidebar'
import { PostEditorPreview } from './PostEditorPreview'
import { PreviewSwitch } from './PreviewSwitch'
import { useGetPostQuery } from '@/app/hooks/use-get-post-query'
import { PostEditorContext } from '@/app/components/Providers'

export function PostEditor({ slug: propsSlug = '' }) {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null as any)
    const post = useGetPostQuery({ slug: propsSlug })
    const {
        setDraftState,
        isPreviewing,
    } = React.useContext(PostEditorContext)

    // Update draft state when post data changes or slug changes
    React.useEffect(() => {
        if (post) {
            setDraftState({
                title: post.title || '',
                text: post.text || '',
                slug: post.slug || '',
                excerpt: post.excerpt || '',
            })
        } else if (propsSlug === '') {
            // Reset for new post
            setDraftState({
                title: '',
                text: '',
                slug: '',
                excerpt: '',
            })
        }
    }, [post, propsSlug, setDraftState])

    return (
        <>
            <Detail.Container ref={scrollContainerRef}>
                <TitleBar
                    backButton
                    globalMenu={false}
                    backButtonHref={'/writing'}
                    scrollContainerRef={scrollContainerRef}
                    title=""
                    trailingAccessory={<PostEditorActions />}
                    leadingAccessory={<PreviewSwitch />}
                />

                {isPreviewing ? <PostEditorPreview /> : <PostEditorComposer />}
            </Detail.Container>
            <PostEditorMetaSidebar />
        </>
    )
}