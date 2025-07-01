"use client"
import { LayoutGroup, motion } from 'framer-motion'
import { useState, useEffect } from 'react'

type Item = {
    id: string
    label: string
}

type SegmentedControlProps = {
    onSetActiveItem: Function
    items: Array<Item>
    active: string
}

const SegmentedControl = ({
    onSetActiveItem,
    items,
    active,
}: SegmentedControlProps): React.ReactElement => {
    const [activeItem, setActiveitem] = useState(active)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    function onChange(i: number) {
        setActiveitem(items[i].id)
        onSetActiveItem(items[i].id)
    }

    // Don't render on server to avoid hydration mismatch
    if (!isClient) {
        return <div className="h-8 w-full" /> // Placeholder with same height
    }

    return (
        <div>
            {/* <LayoutGroup> */}
            <ol
                className="flex list-none rounded-md bg-black/5 p-1 dark:bg-white/5"
            >
                {items.map((item, i) => {
                    const isActive = items[i].id === activeItem
                    return (
                        // <motion.li
                        <li
                            className="relative flex-1 leading-none"
                            // whileTap={isActive ? { scale: 0.95 } : { opacity: 0.6 }}
                            key={item.id}
                        >
                            <button
                                onClick={() => onChange(i)}
                                type="button"
                                className={`relative w-full cursor-pointer bg-transparent px-4 py-1.5 text-xs font-semibold leading-none ${isActive
                                    ? `text-black dark:text-white`
                                    : `text-black/60 hover:text-black dark:text-white`
                                    }`}
                            >
                                {isActive && (
                                    // <motion.div
                                    <div
                                        // layoutId="SegmentedControlActive"
                                        className="z-1 absolute top-0 bottom-0 left-0 right-0 rounded bg-white shadow-sm content-none dark:bg-gray-700"
                                    />
                                )}
                                <span className="z-2 relative">{item.label}</span>
                            </button>
                        </li>
                    )
                })}
            </ol>
            {/* </LayoutGroup> */}
        </div>
    )
}

export default SegmentedControl