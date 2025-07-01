"use client";

import { Label } from "@/app/components/ui/label"
import { Switch as ShadcnSwitch } from "@/app/components/ui/switch"
import { useState } from "react"

interface SwitchProps {
    label?: string | null;
    onChange?: ((enabled: boolean) => void) | null;
    defaultEnabled?: boolean;
}

export function Switch({
    label = null,
    onChange = null,
    defaultEnabled = false,
}: SwitchProps) {
    const [enabled, setEnabled] = useState(defaultEnabled)
    function handleChange() {
        onChange?.(!enabled)
        setEnabled(!enabled)
    }
    return (
        <div className="flex items-center">
            {label && (
                <Label htmlFor={label} className="text-primary mr-2 text-sm font-medium">
                    {label}
                </Label>
            )}
            <ShadcnSwitch
                checked={enabled}
                onCheckedChange={handleChange}
                className={`${enabled ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
                    } relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            />
        </div>
    )
}
