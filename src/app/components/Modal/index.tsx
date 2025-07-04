'use client'

import * as React from 'react'
import { Fragment, useState } from 'react'
import { X } from 'lucide-react'

import { Button } from '@/app/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog'

interface DialogProps {
    trigger?: React.ReactElement | null
    children: React.ReactNode | null
    title: String
    modalContent: any
}

export function ModalComponent({
    trigger = null,
    children = null,
    title,
}: DialogProps) {
    let [isOpen, setIsOpen] = useState(false)
    let closeButtonRef = React.useRef(null)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>

            {/* 
        Rendering children as a function here allows us to
        wrap any component in a dialog handler, while still rendering
        that component. For example, we can wrap the CommentForm component
        in a dialog, render the comment form itself, but pass it the SignIn
        dialog's openModal and closeModal handlers. Those handlers can then
        be invoked programatically in the CommentForm if a user tries to
        send a comment without being signed in.  
      */}

            <Dialog
                open={isOpen}
                onOpenChange={setIsOpen}
            //   initialFocus={closeButtonRef}
            >
                <DialogTrigger asChild className="fixed inset-0 z-10 overflow-y-auto">
                    {trigger}
                </DialogTrigger>
                <div className="min-h-screen px-4">
                    <DialogContent className="fixed inset-0 bg-black bg-opacity-50" />


                    <div className="fixed bottom-0 left-0 max-h-screen w-full transform-gpu overflow-y-auto rounded-t-xl border border-gray-200 bg-white pb-10 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-2xl sm:bottom-auto sm:top-1/4 sm:left-1/2 sm:max-w-sm sm:-translate-x-1/2 sm:rounded-xl sm:pb-0 md:max-w-md lg:max-w-lg">
                        <div className="flex flex-col">
                            <div className="sticky top-0 flex w-full items-center justify-between border-b border-gray-150 bg-white py-2 pl-4 pr-2 dark:border-gray-700 dark:bg-gray-800">
                                <DialogTitle
                                    className="text-primary text-left text-sm font-semibold"
                                >
                                    {title}
                                </DialogTitle>
                                <Button
                                    variant={"ghost"}
                                    aria-label="Close dialog"
                                    size="sm"
                                    ref={closeButtonRef}
                                    onClick={closeModal}
                                >
                                    <X size={16} />
                                </Button>
                            </div>

                            <div className="overflow-y-auto">
                                {/* 
                      A dialog must receive modal content to be rendered
                      once the dialog is opened. That dialog content receives
                      open and close handlers so that a dialog can be closed
                      programatically. For example, after creating a bookmark
                      we can close the dialog and then redirect the user
                      to the new bookmark view.
                    */}
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
