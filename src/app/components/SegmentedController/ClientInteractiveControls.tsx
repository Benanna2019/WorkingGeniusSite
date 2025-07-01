// ClientInteractiveControls.tsx
"use client"

import * as React from "react"
import SegmentedControl from "."
import { WritingContext } from "../Providers"

export function ClientInteractiveControls() {
    const { setFilter, filter } = React.useContext(WritingContext)

    console.log('filter', filter)

    return (
        <SegmentedControl
            onSetActiveItem={setFilter}
            active={filter}
            items={[
                { id: 'published', label: 'Published' },
                { id: 'draft', label: 'Drafts' },
            ]}
        />
    )
}