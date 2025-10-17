import './globals.css'

import type {Metadata} from 'next'
import {Poppins} from 'next/font/google'
import {ReactNode} from 'react'

import {Toaster} from '@/components/ui/sonner';
import {cn} from '@/lib/utils';
import {AbstractApolloProvider} from '@/providers/ApolloProvider';
import {AuthProvider} from '@/providers/AuthProvider';

const poppins = Poppins({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-poppins'
})

const title = 'Kelkun Notes Test'

export const metadata: Metadata = {
    title
};


export default function RootLayout({children}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html suppressHydrationWarning lang={'fr'} className={poppins.variable}>
        <body className={cn([
            'antialiased text-gray-900 bg-gray-100',
            poppins.className
        ])}>
        <AbstractApolloProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </AbstractApolloProvider>
        <Toaster position={'top-center'}/>
        </body>
        </html>
    )
}
