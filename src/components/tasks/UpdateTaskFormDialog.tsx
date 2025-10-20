import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Task,
  useUpdateTaskMutation,
} from "@/services/graphql/generated/graphql";
import { updateTaskSchema } from "@/services/schemas/task/updateTaskShema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useStatusStore } from "@/services/stores/statusStore";

interface IProps {
  onUpdate: (task: Task) => void;
  taskToUpdate: Task;
}

type UpdateTaskFormValues = z.infer<typeof updateTaskSchema>;

export default function UpdateTaskFormDialog({onUpdate,taskToUpdate}: IProps) {
    const [isOpen, setIsOpen] = useState(false);
    const statusInStore = useStatusStore((state) => state.status);

    const [updateTask, { loading }] = useUpdateTaskMutation({
        onError: (err) => toast.error(err.message),
        onCompleted: (res) => {
        toast.success("Tâche modifiée avec succès");
        setIsOpen(false);
        onUpdate(res.updateTask as Task);
        },
    });

    const form = useForm<UpdateTaskFormValues>({
        resolver: zodResolver(updateTaskSchema),
        defaultValues: {
        title: "",
        description: "",
        statusId: "",
        },
    });

    // Quand la modale s’ouvre, on réinitialise les valeurs
    useEffect(() => {
        if (isOpen && taskToUpdate) {
        form.reset({
            title: taskToUpdate.title,
            description: taskToUpdate.description ?? "",
            statusId: taskToUpdate.status.id,
        });
        }
    }, [isOpen, taskToUpdate, form]);

    const handleSubmit = async (dto: UpdateTaskFormValues) => {
        await updateTask({
        variables: {
            dto: {
            ...dto,
            id: taskToUpdate.id,
            projectId: taskToUpdate.project.id,
            },
        },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <SquarePen className="cursor-pointer" />
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
            <DialogHeader>
            <DialogTitle>Modifier une Tâche</DialogTitle>
            </DialogHeader>

            <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
            >
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Titre de la tâche</FormLabel>
                    <FormControl>
                        <Input placeholder="Ex: Peinture mur" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="Ex: repeindre le mur droit en rouge"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="statusId"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Statut</FormLabel>
                    <FormControl>
                        <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        >
                        <SelectTrigger className="flex border border-gray-700 rounded-full cursor-pointer">
                            <SelectValue placeholder="Choisir un statut" />
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
                    <FormMessage />
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
                    {loading ? "Modification..." : "Modifier la tâche"}
                </Button>
                </DialogFooter>
            </form>
            </Form>
        </DialogContent>
        </Dialog>
    );
}
