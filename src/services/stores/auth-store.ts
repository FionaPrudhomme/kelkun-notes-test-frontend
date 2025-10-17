'use client'

import {createStore} from 'zustand'
import {persist} from 'zustand/middleware'

import {User} from '@/services/graphql/generated/graphql'

export interface AuthState {
    user: User | null
    setUser: (user: User | null) => void
    logout: () => void
}

export const createAuthStore = () =>
    createStore<AuthState>()(
        persist(
            (set) => ({
                user: null,
                setUser: (user) => set({user}),
                logout: () => set({user: null})
            }),
            {
                name: 'auth-storage',
                partialize: (state) => ({user: state.user}) // ne garde que le user
            }
        )
    )
