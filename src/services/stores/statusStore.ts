import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Status } from '@/services/graphql/generated/graphql'

interface StatusStore {
  status: Status[]
  setStatus: (status: Status[]) => void
  clearStatus: () => void
}

export const useStatusStore = create<StatusStore>()(
  persist(
    (set) => ({
      status: [],
      setStatus: (status) => set({ status }),
      clearStatus: () => set({ status: [] }),
    }),
    {
      name: 'status-storage',
    }
  )
)
