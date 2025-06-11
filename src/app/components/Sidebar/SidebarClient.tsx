'use client'

import { useState, useEffect } from 'react'

export function SidebarClient() {
    const [isOpen, setIsOpen] = useState(false)

    // Close sidebar on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false)
            }
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen])

    // Apply classes to the existing nav element
    useEffect(() => {
        const nav = document.querySelector('[data-sidebar-nav]') as HTMLElement
        if (!nav) return

        if (isOpen) {
            nav.classList.remove('-translate-x-full')
            nav.classList.add('translate-x-0', 'shadow-lg')
        } else {
            nav.classList.add('-translate-x-full')
            nav.classList.remove('translate-x-0', 'shadow-lg')
        }
    }, [isOpen])

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed top-4 left-4 z-40 p-2 rounded-md bg-white shadow-md border border-gray-200 text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 lg:hidden ${isOpen ? 'hidden' : 'block'
                    }`}
                aria-label="Open sidebar"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
                />
            )}

            {/* Close button for mobile (injected into nav) */}
            {isOpen && (
                <div className="fixed top-4 right-4 z-50 lg:hidden">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800"
                        aria-label="Close sidebar"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
        </>
    )
} 