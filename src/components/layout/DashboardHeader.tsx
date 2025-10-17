import {Menu} from 'lucide-react'

import {Button} from '@/components/ui/button'
import {useAuth} from '@/providers/AuthProvider';

interface HeaderProps {
    onOpenSidebar: () => void
}

export function DashboardHeader({onOpenSidebar}: HeaderProps) {
    const {user, logout} = useAuth()
    return (
        <header
            className="sticky top-0 z-30 flex items-center justify-between bg-gray-950 border-b border-gray-800 px-6 py-4">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="md:hidden" onClick={onOpenSidebar}>
                    <Menu className="h-5 w-5 text-gray-300"/>
                </Button>
                <h2 className="text-lg font-semibold text-white">
                    Bonjour, {user?.firstname} 👋
                </h2>
            </div>

            <div className="flex items-center gap-4">
                <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                    onClick={logout}>
                    Déconnexion
                </Button>
            </div>
        </header>
    )
}
