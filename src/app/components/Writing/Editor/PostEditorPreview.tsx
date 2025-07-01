'use client'

import * as React from 'react'

import { Detail } from '@/app/components/ListDetail/Detail'
import { MarkdownRenderer } from '@/app/components/MarkdownRenderer'
import { usePostEditorFeatures } from '@/app/components/Providers'

export function PostEditorPreview() {
    const { draftState } = usePostEditorFeatures()
    const { title, text } = draftState

    return (
        <div className="mx-auto w-full flex max-w-3xl flex-col space-y-8 px-4 py-24">
            <Detail.ContentContainer>
                <Detail.Header>
                    <Detail.Title>{title}</Detail.Title>
                </Detail.Header>

                <div className="prose mt-8">
                    <MarkdownRenderer markdown={text} />
                </div>

                {/* bottom padding to give space between post content and comments */}
                <div className="py-6" />
            </Detail.ContentContainer>
        </div>
    )
}