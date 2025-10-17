import {z} from 'zod'

export const createUserSchema = z.object({
    firstname: z.string().min(1, `Veuillez entrer le prénom`),
    email: z.string().email(`Veuillez entrer une adresse email valide`)
})
