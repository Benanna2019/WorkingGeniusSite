"use client";

import * as React from 'react'
import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/app/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/app/components/ui/dialog'

interface CommentMenuProps {
    handleDelete: () => void;
    handleEdit: () => void;
    comment: {
        viewerCanEdit?: boolean;
        viewerCanDelete?: boolean;
    };
}

export function CommentMenu({ handleDelete, handleEdit, comment }: CommentMenuProps) {
    const [open, setOpen] = React.useState(false)

    const onEdit = () => {
        handleEdit()
        setOpen(false)
    }

    const onDelete = () => {
        handleDelete()
        setOpen(false)
    }

    return (
        <div className="flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        aria-label="Open comment actions menu"
                        className="h-8 w-8 p-0"
                    >
                        <MoreHorizontal size={16} />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[300px]">
                    <DialogHeader>
                        <DialogTitle>Comment Actions</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col space-y-2">
                        {comment.viewerCanEdit && (
                            <Button
                                variant="ghost"
                                onClick={onEdit}
                                className="justify-start"
                            >
                                Edit
                            </Button>
                        )}
                        {comment.viewerCanDelete && (
                            <Button
                                variant="ghost"
                                onClick={onDelete}
                                className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                            >
                                Delete
                            </Button>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}