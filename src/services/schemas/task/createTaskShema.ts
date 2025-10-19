import {z} from 'zod'

export const createTaskSchema = z.object({
    title: z.string().min(1, `Veuillez entrer le titre de la tache`),
    description: z.string() || null
})
