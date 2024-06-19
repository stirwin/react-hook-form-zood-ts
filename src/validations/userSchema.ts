import {z} from 'zod';

const plans= ["free", "basic", "medium", "premium"] as const;


export type Plans = (typeof plans)[number];

export const mappedPlans: {[key in Plans]: string}={
    free: 'Gratis',
    basic: 'Basico',
    medium: 'Medio',
    premium: 'Premium'

}

export const userSchema= z.object({

    name: z.string().min(3,{
        message:'El nombre debe tener al menos 3 caracteres'
    }).max(200,{
        message:'El nombre debe tener como maximo 200 caracteres'
    }),

    email: z.string().email({
        message:'El email no es valido'
    }),

    password: z.string().min(6,{
        message:'la contraseña debe tener al menos 6 caracteres'
    }),

    confirmPassword: z.string().min(6,{
        message:'la contraseña debe tener al menos 6 caracteres'
    }),

    weight: z.string().refine(weight=> !isNaN(parseFloat(weight)),{
        message: 'el peso debe ser un número'
    }),

    plan: z.enum(plans,{
        errorMap: () => ({message: 'debe seleccionar un plan'})
    }),

    cumple: z.string().refine(dob => new Date(dob).toString() !=='Invalid Date',{
        message:'la fecha de nacimiento no es valida'
    }),

}).refine(data=>data.password===data.confirmPassword,{
    message:'las contrasenias no coinciden',
    path:['confirmPassword']
});