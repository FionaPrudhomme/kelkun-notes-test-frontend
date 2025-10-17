import {z} from 'zod'

export const createProjectSchema = z.object({
    name: z.string().min(1, 'Veuillez entrer le nom du projet')
})
