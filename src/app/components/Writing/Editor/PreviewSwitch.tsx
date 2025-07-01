"use client"

import * as React from 'react'
import { Switch } from '@/app/components/Switch'
import { PostEditorContext } from '@/app/components/Providers'

export function PreviewSwitch() {
    const { isPreviewing, setIsPreviewing } = React.useContext(PostEditorContext)

    return (
        <Switch
            label={'Preview'}
            defaultEnabled={isPreviewing}
            onChange={(val) => setIsPreviewing(val)}
        />
    )
}