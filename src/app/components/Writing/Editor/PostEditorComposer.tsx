"use client"
import * as React from 'react'

import { Input } from '@/app/components/ui/input'
import { Textarea } from '@/app/components/ui/textarea'
import { PostEditorContext } from '@/app/components/Providers'

export function PostEditorComposer() {
    const { draftState, setDraftState } = React.useContext(PostEditorContext)

    function updateTitle(title: string) {
        setDraftState((draft) => ({ ...draft, title }))
    }

    function updateText(text: string) {
        setDraftState((draft) => ({ ...draft, text }))
    }

    return (
        <div className="mx-auto w-full flex max-w-3xl flex-col space-y-8 px-4 py-24">
            <Input
                type='text'
                value={draftState.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateTitle(e.target.value)}
                placeholder="Post title..."
                className="block w-full border-none p-0 md:text-2xl font-bold placeholder-gray-300 focus:border-none focus:outline-none focus:ring-0 dark:bg-transparent dark:text-white placeholder:text-2xl"
            />
            <Textarea
                rows={25}
                value={draftState.text}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateText(e.target.value)}
                placeholder="Write a post..."
                className="block w-full resize-none border-none p-0 text-lg placeholder-gray-300 focus:border-none focus:outline-none focus:ring-0 dark:bg-transparent dark:text-white"
            />
        </div>
    )
}