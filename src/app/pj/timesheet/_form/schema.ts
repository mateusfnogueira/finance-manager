import { z } from 'zod'

export const formSchema = z.object({
  month: z
    .string()
    .trim()
    .min(1, { message: 'O mês é obrigatório.' }),
  year: z.string({ required_error: 'O ano é obrigatório.' }),
  hoursPerDay: z.string({
    required_error: 'As horas por dia são obrigatórias.'
  }),
  daysPerWeek: z.string({
    required_error: 'Os dias por semana são obrigatórios.'
  })
})

export type FormSchema = z.infer<typeof formSchema>
