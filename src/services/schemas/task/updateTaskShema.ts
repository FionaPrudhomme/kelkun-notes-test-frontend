import {z} from 'zod'

export const updateTaskSchema = z.object({
    title: z.string().min(1, `Veuillez entrer le titre de la tache`),
    description: z.string() || null, 
    statusId:  z.string().uuid('Veuillez soummetre un uuid correct')
})
