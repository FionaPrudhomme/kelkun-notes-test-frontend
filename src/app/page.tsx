'use client'

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import CreateUserFormDialog from '@/components/users/CreateUserFormDialog'
import {useAuth} from '@/providers/AuthProvider'
import {useAllUsersQuery, User} from '@/services/graphql/generated/graphql'

export default function SelectUserPage() {
    const {data, refetch} = useAllUsersQuery()
    const {setUser} = useAuth()
    const users = data?.allUsers || []

    const handleCreated = async (newUser: User) => {
        await refetch()
        setUser(newUser)
    }

    const handleSelectUser = (userId: string) => {
        const selectedUser = data?.allUsers.find((user) => user.id === userId)
        if (selectedUser) {
            setUser(selectedUser)
        }
    }

    return (
        <main
            className="h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center p-8">
            <div
                className="w-full max-w-md bg-gray-950/60 backdrop-blur-md border border-gray-800 rounded-xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2 tracking-tight">Bienvenue 👋</h1>
                    <p className="text-gray-400 text-sm">
                        Sélectionne ton profil utilisateur pour accéder à ton espace projet.
                    </p>
                </div>
                <div className="flex items-center justify-between gap-2 mb-6">
                    <Select onValueChange={handleSelectUser} disabled={users.length < 1}>
                        <SelectTrigger
                            className="flex-1 bg-gray-900 text-gray-100 border border-gray-700 rounded-full cursor-pointer hover:bg-gray-800">
                            <SelectValue placeholder="Sélectionner un utilisateur"/>
                        </SelectTrigger>
                        <SelectContent>
                            {users.map((user) => (
                                <SelectItem value={user.id} key={user.id}>
                                    {user.firstname}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <CreateUserFormDialog onCreated={handleCreated}/>
                </div>
            </div>
            <footer className="mt-6 text-gray-500 text-xs text-center">
                <p>
                    Développé pour le test technique <strong>Kelkun</strong> — stack{' '}
                    <code>NestJS</code> + <code>Next.js</code>
                </p>
            </footer>
        </main>
    )
}
