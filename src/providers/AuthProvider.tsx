'use client'

import {usePathname, useRouter} from 'next/navigation';
import {createContext, ReactNode, useContext, useEffect, useRef} from 'react'
import {useStore} from 'zustand'

import {AuthState, createAuthStore} from '@/services/stores/auth-store';

type AuthStore = ReturnType<typeof createAuthStore>

const AuthContext = createContext<AuthStore | null>(null)

export function useAuth<T = AuthState>(
    selector: (state: AuthState) => T = (state) => state as unknown as T
): T {
    const store = useContext(AuthContext)
    if (!store) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    // Appel unique et non conditionnel du hook
    return useStore(store, selector)
}

export function AuthProvider({children}: { children: ReactNode }) {

    const storeRef = useRef<AuthStore | null>(null)
    const router = useRouter()
    const pathname = usePathname()

    if (!storeRef.current) {
        storeRef.current = createAuthStore()
    }

    const user = useStore(storeRef.current, (s) => s.user)

    useEffect(() => {
        if (user && pathname === '/') {
            router.push('/dashboard')
        } else if (!user && pathname.startsWith('/dashboard')) {
            router.push('/')
        }
    }, [user, pathname, router])

    return (
        <AuthContext.Provider value={storeRef.current}>
            {children}
        </AuthContext.Provider>
    )
}
