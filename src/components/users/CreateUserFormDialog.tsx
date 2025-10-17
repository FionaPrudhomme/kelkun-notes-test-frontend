import {zodResolver} from '@hookform/resolvers/zod'
import {Plus} from 'lucide-react'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'sonner';
import {z} from 'zod'

import {Button} from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {useCreateUserMutation, User} from '@/services/graphql/generated/graphql';
import {createUserSchema} from '@/services/schemas/users/createUserSchema';

interface IProps {
    onCreated: (user: User) => void
}

type CreateUserFormValues = z.infer<typeof createUserSchema>

export default function CreateUserFormDialog({onCreated}: IProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [createUser, {loading}] = useCreateUserMutation({
        onError: (err) => toast.error(err.message),
        onCompleted: (res) => {
            toast.success(`Utilisateur créé avec succès !`)
            setIsOpen(false)
            form.reset()
            onCreated(res.createUser as User)
        }
    })
    const form = useForm<CreateUserFormValues>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            firstname: '',
            email: ''
        }
    })

    const handleSubmit = async (dto: CreateUserFormValues) => {
        await createUser({
            variables: {
                dto
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    size="icon"
                    variant="secondary"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md"
                >
                    <Plus className="h-5 w-5"/>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Ajouter un utilisateur</DialogTitle>
                    <DialogDescription>
                        Crée ton profil pour accéder à la suite de l'exercice.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Prénom</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex: Camille"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="exemple@domaine.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                            >
                                Annuler
                            </Button>
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Enregistrer
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
