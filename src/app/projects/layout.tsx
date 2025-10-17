import type {Metadata} from 'next'
import {ReactNode} from 'react'

import {DashboardShell} from '@/components/layout/DashboardShell';

export const metadata: Metadata = {
    title: 'Dashboard'
}

export default function Layout({children}: { children: ReactNode }) {
    return <DashboardShell>{children}</DashboardShell>
}
