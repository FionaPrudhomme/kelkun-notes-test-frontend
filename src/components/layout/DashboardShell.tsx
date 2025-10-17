'use client'

import {ReactNode, useState} from 'react'

import {DashboardContent} from '@/components/layout/DashboardContent';
import {DashboardHeader} from '@/components/layout/DashboardHeader';
import {DashboardSidebar} from '@/components/layout/DashboardSidebar';

export function DashboardShell({children}: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex h-screen overflow-hidden bg-gray-900 text-white">
            <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
            <div className="flex-1 flex flex-col md:ml-64 h-full">
                <DashboardHeader onOpenSidebar={() => setSidebarOpen(true)}/>
                <DashboardContent>{children}</DashboardContent>
            </div>
        </div>
    )
}
