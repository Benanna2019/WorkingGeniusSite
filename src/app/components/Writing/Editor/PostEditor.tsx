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

export type DraftState = {
    title: string;
    text: string;
    slug: string;
    excerpt: string;
}

type PostEditorContextType = {
    draftState: DraftState;
    setDraftState: React.Dispatch<React.SetStateAction<DraftState>>;
    existingPost: any;
    sidebarIsOpen: boolean;
    setSidebarIsOpen: (isOpen: boolean) => void;
    isPreviewing: boolean;
    setIsPreviewing: (isPreviewing: boolean) => void;
}

export const PostEditorContext = React.createContext<PostEditorContextType>({
    draftState: {
        title: '',
        text: '',
        slug: '',
        excerpt: '',
    },
    setDraftState: () => { },
    existingPost: null,
    sidebarIsOpen: false,
    setSidebarIsOpen: (isOpen: boolean) => { },
    isPreviewing: false,
    setIsPreviewing: (isPreviewing: boolean) => { },
})

export function PostEditor({ slug: propsSlug = '' }) {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null as any)
    // const { data } = useGetPostQuery({ variables: { slug: propsSlug } })

    // const defaultDraftState = {
    //     title: data?.post?.title || '',
    //     text: data?.post?.text || '',
    //     slug: data?.post?.slug || '',
    //     excerpt: data?.post?.excerpt || '',
    // }

    const defaultDraftState = {
        title: '',
        text: '',
        slug: '',
        excerpt: '',
    }

    const [draftState, setDraftState] = React.useState(defaultDraftState)
    const [isPreviewing, setIsPreviewing] = React.useState(false)

    // const existingPost = data?.post
    const existingPost = null
    const [sidebarIsOpen, setSidebarIsOpen] = React.useState(false)

    React.useEffect(() => {
        // if navigating between drafts, reset the state each time with the correct
        // post data
        setDraftState(defaultDraftState)
    }, [propsSlug])

    const defaultContextValue = {
        existingPost,
        draftState,
        setDraftState,
        sidebarIsOpen,
        setSidebarIsOpen,
        isPreviewing,
        setIsPreviewing,
    }

    return (
        <PostEditorContext.Provider value={defaultContextValue}>
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
        </PostEditorContext.Provider>
    )
}