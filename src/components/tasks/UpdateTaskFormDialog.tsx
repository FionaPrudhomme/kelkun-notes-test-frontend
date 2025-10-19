import {zodResolver} from '@hookform/resolvers/zod'
import {SquarePen} from 'lucide-react'
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
import {Task, useUpdateTaskMutation} from '@/services/graphql/generated/graphql'
import { updateTaskSchema } from '@/services/schemas/task/updateTaskShema'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useStatusStore } from '@/services/stores/statusStore'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'

interface IProps {
    onUpdate: (task: Task) => void, 
    taskToUpdate: Task, 
}

type UpdateTaskFormValues = z.infer<typeof updateTaskSchema>

export default function UpdateTaskFormDialog({ onUpdate, taskToUpdate }: IProps) {
    
    const [isOpen, setIsOpen] = useState(false); 
    const [selectedStatus, setSelectedStatus] = useState(taskToUpdate.status.id); 

    const statusInStore = useStatusStore((state) => state.status);
    
    const [updateTask, {loading}] = useUpdateTaskMutation({
        onError: (err) => toast.error(err.message),
        onCompleted: (res) => {
            toast.success('Tache modifié avec succès')
            setIsOpen(false)
            form.reset()
            onUpdate(res.updateTask as Task)
        }
    })

    const form = useForm<UpdateTaskFormValues>({
        resolver: zodResolver(updateTaskSchema),
        defaultValues: {
            title: taskToUpdate.title, 
            description: taskToUpdate.description ?? '', 
            statusId: selectedStatus
        }
    })

    const handleSubmit = async (dto: UpdateTaskFormValues) => {
        await updateTask({
            variables: {
                dto: {
                  ...dto,
                    projectId: taskToUpdate.project.id, 
                    id: taskToUpdate.id, 
                    statusId: selectedStatus
                }
            }
        })
    }

    const handleSelectStatus = (statusId: string) => {
        setSelectedStatus(statusId); 
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <SquarePen className='cursor-pointer'/>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Modifier une Tache</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Titre de la tache</FormLabel>
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
                                    <FormLabel>Description de la tache</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Ex: Repeindre le mur droit en rouge et les autres en blanc" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="statusId"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Description de la tache</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={handleSelectStatus} value={selectedStatus} >
                                            <SelectTrigger
                                                className="flex border border-gray-700 rounded-full cursor-pointer">
                                                <SelectValue/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {statusInStore.map((status) => (
                                                    <SelectItem value={status.id} key={status.id}>
                                                        {status.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                                {loading ? 'Création...' : 'Modifier la tache'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
