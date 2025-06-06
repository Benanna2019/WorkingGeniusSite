import * as React from 'react'

import { Comments } from '@/app/components/Comment'
import { Detail } from '@/app/components/ListDetail/Detail'
import { TitleBar } from '@/app/components/ListDetail/Titlebar'
import { MarkdownRenderer } from '@/app/components/MarkdownRenderer'
// import { CommentType, useGetPostQuery } from '~/graphql/types.generated'
import { timestampToCleanTime } from '@/app/lib/utils'

import { PostActions } from './PostActions'

export function PostDetail({ slug }: { slug: string }) {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null as any)
    const titleRef = React.useRef<HTMLParagraphElement>(null as any)
    // const { data, error, loading } = useGetPostQuery({ variables: { slug } })

    // if (loading) {
    //     return <Detail.Loading />
    // }

    // if (!data?.post || error) {
    //     return <Detail.Null />
    // }
    // const { post } = data
    // const publishedAt = timestampToCleanTime({ timestamp: post.publishedAt })
    return (
        <>
            <Detail.Container data-cy="post-detail" ref={scrollContainerRef}>
                <TitleBar
                    backButton
                    globalMenu={false}
                    backButtonHref={'/writing'}
                    magicTitle
                    // title={post.title}
                    title="Post Title"
                    titleRef={titleRef}
                    scrollContainerRef={scrollContainerRef}
                // trailingAccessory={<PostActions post={post} />}
                />

                <Detail.ContentContainer>
                    <Detail.Header>
                        {/* <Detail.Title ref={titleRef}>{post.title}</Detail.Title>
                        <span
                            title={publishedAt.raw}
                            className="text-tertiary inline-block leading-snug"
                        >
                            {publishedAt.formatted}
                        </span> */}
                    </Detail.Header>

                    {/* <MarkdownRenderer children={post.text} className="prose mt-8" /> */}

                    {/* bottom padding to give space between post content and comments */}
                    <div className="py-6" />
                </Detail.ContentContainer>

                {/* <Comments refId={post.id} type={CommentType.Post} /> */}
            </Detail.Container>
        </>
    )
}