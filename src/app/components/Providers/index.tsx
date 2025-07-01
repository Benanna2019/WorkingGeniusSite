'use client'

import * as React from 'react'

import { Toaster } from "@/app/components/ui/sonner"
import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { NuqsAdapter } from 'nuqs/adapters/react'
import { useQueryState } from 'nuqs';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);
interface Props {
    children?: any
}

// PostEditor types
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
    isAvailable: boolean;
}

// Create contexts inside the component scope to avoid Fast Refresh issues
export const GlobalNavigationContext = React.createContext({
    isOpen: false,
    setIsOpen: (val: boolean) => { },
})

export const WritingContext = React.createContext<{
    filter: string
    setFilter: (filter: "published" | "draft") => void
    isAvailable: boolean
}>({
    filter: 'published',
    setFilter: (filter: string) => { },
    isAvailable: false
})

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
    isAvailable: false,
})

// Export a custom hook instead of the context directly
export function useGlobalNavigation() {
    return React.useContext(GlobalNavigationContext)
}

export function Providers({ children }: Props) {
    const initialState = {
        isOpen: false,
        setIsOpen,
    }

    const [state, setState] = React.useState(initialState)

    function setIsOpen(isOpen: boolean) {
        return setState({ ...state, isOpen })
    }

    return (
        <>
            {/* <SEO /> */}
            <Toaster />

            <ConvexAuthProvider client={convex}>
                <NuqsAdapter>
                    <GlobalNavigationContext.Provider value={state}>
                        <WritingProvider>
                            <PostEditorProvider>
                                {children}
                            </PostEditorProvider>
                        </WritingProvider>
                    </GlobalNavigationContext.Provider>
                </NuqsAdapter>
            </ConvexAuthProvider>
        </>
    )
}

function WritingProvider({ children }: Props) {
    const [filter, setFilter] = useQueryState('filter', { defaultValue: "published", clearOnDefault: false })

    return (
        <WritingContext.Provider value={{ filter, setFilter, isAvailable: true }}>
            {children}
        </WritingContext.Provider>
    )
}

function PostEditorProvider({ children }: Props) {
    const defaultDraftState = {
        title: '',
        text: '',
        slug: '',
        excerpt: '',
    }

    const [draftState, setDraftState] = React.useState<DraftState>(defaultDraftState)
    const [isPreviewing, setIsPreviewing] = React.useState(false)
    const [sidebarIsOpen, setSidebarIsOpen] = React.useState(false)

    // You can add logic here to load existing post data if needed
    const existingPost = null

    const contextValue = {
        existingPost,
        draftState,
        setDraftState,
        sidebarIsOpen,
        setSidebarIsOpen,
        isPreviewing,
        setIsPreviewing,
        isAvailable: true,
    }

    return (
        <PostEditorContext.Provider value={contextValue}>
            {children}
        </PostEditorContext.Provider>
    )
}

export function useWritingContext() {
    return React.useContext(WritingContext)
}

export function useWritingFeatures() {
    const context = useWritingContext()

    if (!context.isAvailable) {
        throw new Error('Writing features are not available for this user')
    }

    return context
}

export function usePostEditorContext() {
    return React.useContext(PostEditorContext)
}

export function usePostEditorFeatures() {
    const context = usePostEditorContext()
    console.log("context", context)

    if (!context.isAvailable) {
        throw new Error('Post editor features are not available for this user')
    }

    return context
}