'use client'

import * as React from 'react'

import { Toaster } from "@/app/components/ui/sonner"

interface Props {
    children?: any
}

const globalNavigationContext = {
    isOpen: false,
    setIsOpen: (val: boolean) => { },
}

export const GlobalNavigationContext = React.createContext(
    globalNavigationContext
)

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

            <GlobalNavigationContext.Provider value={state}>
                {children}
            </GlobalNavigationContext.Provider>
        </>
    )
}