import * as React from 'react'

import { Dropzone } from '@/app/components/Dropzone'
import { Textarea } from '@/app/components/Input'
import { Detail } from '@/app/components/ListDetail/Detail'

import { PostEditorContext } from './PostEditor'

export function PostEditorComposer() {
    const context = React.useContext(PostEditorContext)
    const { draftState, setDraftState } = context
    const uploadingImagePlaceholder = '![](Uploading...)'

    function handleTitleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setDraftState((draft) => ({ ...draft, title: e.target.value }))
    }

    function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setDraftState((draft) => ({ ...draft, text: e.target.value }))
    }

    function onUploadComplete(url?: string) {
        if (!url) return
        const image = `![](${url})`
        setDraftState((draft) => ({
            ...draft,
            text: draft.text.replace(uploadingImagePlaceholder, image),
        }))
    }

    function onUploadFailed() {
        setDraftState((draft) => ({
            ...draft,
            text: draft.text.replace(uploadingImagePlaceholder, ''),
        }))
    }

    function onUploadStarted() {
        setDraftState((draft) => ({
            ...draft,
            text: (draft.text += uploadingImagePlaceholder),
        }))
    }

    return (
        <Dropzone
            onUploadStarted={onUploadStarted}
            onUploadComplete={onUploadComplete}
            onUploadFailed={onUploadFailed}
        >
            <Detail.ContentContainer>
                <Detail.Header>
                    <Textarea
                        rows={1}
                        value={draftState.title}
                        onChange={handleTitleChange}
                        placeholder={'Post title'}
                        className="block w-full p-0 text-2xl font-bold border-none composer text-primary focus:border-0 focus:outline-none focus:ring-0 dark:bg-black md:text-3xl"
                    />
                    <Textarea
                        rows={20}
                        maxRows={2000}
                        value={draftState.text}
                        onChange={handleTextChange}
                        placeholder={'Write a post...'}
                        className="block w-full p-0 pt-5 text-lg font-normal prose border-none composer text-primary focus:border-0 focus:outline-none focus:ring-0 dark:bg-black"
                    />
                </Detail.Header>
            </Detail.ContentContainer>
        </Dropzone>
    )
}