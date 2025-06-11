// Server Component - No 'use client' directive

interface NavUserServerProps {
    user: {
        id: string
        name?: string | null
        email?: string | null
        image?: string | null
    }
}

export function NavUserServer({ user }: NavUserServerProps) {
    return (
        <div className="border-t border-gray-150 dark:border-gray-800 p-4">
            <div className="flex items-center space-x-3">
                {/* User Avatar */}
                <div className="flex-shrink-0">
                    {user.image ? (
                        <img
                            className="h-8 w-8 rounded-full"
                            src={user.image}
                            alt={user.name || 'User avatar'}
                        />
                    ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                        </div>
                    )}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {user.name || 'User'}
                    </p>
                    {user.email && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {user.email}
                        </p>
                    )}
                </div>

                {/* Optional: Settings/Menu button - could be enhanced with client component */}
                <div className="flex-shrink-0">
                    <button className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
} 