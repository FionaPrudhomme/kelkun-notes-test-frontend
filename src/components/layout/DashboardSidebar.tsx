import {FolderKanban, LayoutDashboard, X} from 'lucide-react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

import {Button} from '@/components/ui/button'
import {cn} from '@/lib/utils'

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

export function DashboardSidebar({isOpen, onClose}: SidebarProps) {
    const pathname = usePathname()

    const links = [
        {
            href: '/dashboard',
            label: 'Accueil',
            icon: LayoutDashboard
        },
        {
            href: '/projects',
            label: 'Projets',
            icon: FolderKanban
        }
    ]

    return (
        <aside
            className={cn(
                'fixed inset-y-0 left-0 z-40 w-64 bg-gray-950 border-r border-gray-800 p-6 transform transition-transform duration-300 ease-in-out',
                isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            )}
        >
            {/* Header de la sidebar */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold tracking-wide text-white">Kelkun Test</h1>
                <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose}>
                    <X className="h-5 w-5 text-gray-300"/>
                </Button>
            </div>

            {/* Menu de navigation */}
            <nav className="space-y-1">
                {links.map(({href, label, icon: Icon}) => {
                    const isActive = pathname.includes(href)
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                'flex items-center gap-3 rounded-md px-3 py-2 text-gray-300 hover:bg-gray-800 transition-colors',
                                isActive && 'bg-gray-800 text-white'
                            )}
                        >
                            <Icon
                                className={cn(
                                    'h-5 w-5 text-gray-400 transition-colors',
                                    isActive && 'text-blue-400'
                                )}
                            />
                            <span className="text-sm font-medium">{label}</span>
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}
