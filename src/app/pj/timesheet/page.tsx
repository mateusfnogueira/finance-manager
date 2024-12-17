'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { months } from './_consts'
import { FormSchema, formSchema } from './_form/schema'
import { zodResolver } from '@hookform/resolvers/zod'

export default function TimesheetPage() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      month: 'Janeiro',
      year: 2022,
      hourPerDay: 8,
      daysPerWeek: 5
    }
  })

  return (
    <div>
      <h1>Timesheet</h1>

      <Form {...form}>
        <FormField
          control={form.control}
          name="month"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Selecione o Mês de referência para o timesheet
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                {months.map((month) => (
                  <SelectContent key={month.value}>
                    <SelectItem value={month.label}>
                      {month.label}
                    </SelectItem>
                  </SelectContent>
                ))}
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </div>
  )
}
