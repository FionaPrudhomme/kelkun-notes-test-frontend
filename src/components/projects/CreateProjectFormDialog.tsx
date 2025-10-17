import {zodResolver} from '@hookform/resolvers/zod'
import {Plus} from 'lucide-react'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'sonner'
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
import {useAuth} from '@/providers/AuthProvider'
import {Project, useCreateProjectMutation} from '@/services/graphql/generated/graphql'
import {createProjectSchema} from '@/services/schemas/projects/createProjectSchema'

interface IProps {
    onCreated: (project: Project) => void
}

type CreateProjectFormValues = z.infer<typeof createProjectSchema>

export default function CreateProjectFormDialog({onCreated}: IProps) {
    const [isOpen, setIsOpen] = useState(false)
    const {user} = useAuth()
    const [createProject, {loading}] = useCreateProjectMutation({
        onError: (err) => toast.error(err.message),
        onCompleted: (res) => {
            toast.success('Projet créé avec succès 🎉')
            setIsOpen(false)
            form.reset()
            onCreated(res.createProject as Project)
        }
    })

    const form = useForm<CreateProjectFormValues>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            name: ''
        }
    })

    const handleSubmit = async (dto: CreateProjectFormValues) => {
        await createProject({
            variables: {
                dto: {
                    ...dto,
                    userId: user?.id
                }
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                >
                    <Plus className="h-4 w-4"/>
                    Nouveau projet
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Créer un projet</DialogTitle>
                    <DialogDescription>
                        Donne un nom à ton nouveau projet pour commencer.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Nom du projet</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Rénovation cuisine" {...field} />
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
                                disabled={loading}
                            >
                                {loading ? 'Création...' : 'Créer le projet'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
