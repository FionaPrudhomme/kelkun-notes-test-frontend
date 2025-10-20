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
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {Task, useCreateTaskMutation} from '@/services/graphql/generated/graphql'
import { createTaskSchema } from '@/services/schemas/task/createTaskShema'

interface IProps {
  onCreated: (task: Task) => void, 
  projectId: string
}

type CreateTaskFormValues = z.infer<typeof createTaskSchema>

export default function CreateTaskFormDialog({onCreated, projectId}: IProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [createTask, {loading}] = useCreateTaskMutation({
        onError: (err) => toast.error(err.message),
        onCompleted: (res) => {
            toast.success('Tâche créée')
            setIsOpen(false)
            form.reset()
            onCreated(res.createTask as Task)
        }
    })

    const form = useForm<CreateTaskFormValues>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
          title: '', 
          description: ''
        }
    })

    const handleSubmit = async (dto: CreateTaskFormValues) => {
        await createTask({
            variables: {
                dto: {
                  ...dto,
                  projectId: projectId,
                  statusId: ''
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
                    Nouvelle Tâche
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Créer une Tâche</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Titre de la tâche</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Peinture mur" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description de la tâche</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Ex: Repeindre le mur droit en rouge et les autres en blanc" {...field} />
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
                                {loading ? 'Création...' : 'Créer la tâche'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
