import { z } from 'zod'

export const formSchema = z.object({
  month: z
    .string()
    .trim()
    .min(1, { message: 'O mês é obrigatório.' }),
  year: z.number({ required_error: 'O ano é obrigatório.' }),
  hourPerDay: z.number({
    required_error: 'As horas por dia são obrigatórias.'
  }),
  daysPerWeek: z.number({
    required_error: 'Os dias por semana são obrigatórios.'
  })
})

export type FormSchema = z.infer<typeof formSchema>
