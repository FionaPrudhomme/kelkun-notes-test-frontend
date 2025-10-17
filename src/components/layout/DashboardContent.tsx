import {ReactNode} from 'react'

export function DashboardContent({children}: { children: ReactNode }) {
    return (
        <main className="flex-1 overflow-y-auto bg-gray-900 p-6 min-h-0">
            {children}
        </main>
    )
}
