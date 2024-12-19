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
import { months, years } from './_consts'
import { FormSchema, formSchema } from './_form/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { generateTimesheet } from './_action/generate-timesheet'
import { useState } from 'react'

export default function TimesheetPage() {
  const [imageBase64, setImageBase64] = useState<string | null>(null)
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'all',
    defaultValues: {
      month: '1',
      year: '2022',
      hoursPerDay: '8',
      daysPerWeek: '5'
    }
  })

  async function onSubmit(data: FormSchema) {
    console.log(data)
    const { month, year, hoursPerDay, daysPerWeek } = data

    const deliveries = ['one dmu', 'inicio do projeto', 'eccomerce']

    await generateTimesheet({
      name: 'Mateus Franco Nogueira',
      month: Number(month),
      year: Number(year),
      hoursPerDay: Number(hoursPerDay),
      daysPerWeek: Number(daysPerWeek),
      base64Img: imageBase64 || undefined,
      deliveries
    })
  }

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageBase64(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="p-4">
      <h1>Timesheet</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex h-full">
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
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {months.map((month, i) => (
                        <SelectItem
                          key={i}
                          value={month.value.toString()}
                        >
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Selecione o ano de referência para o timesheet
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {years.map((year, i) => (
                        <SelectItem
                          key={i}
                          value={year.value.toString()}
                        >
                          {year.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex">
            <FormField
              control={form.control}
              name="hoursPerDay"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Horas por dia</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="daysPerWeek"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Dias por semana</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormItem className="w-full">
            <FormLabel>Imagem</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </FormControl>
          </FormItem>
          <Button type="submit">Criar Timsheet</Button>
        </form>
      </Form>
    </div>
  )
}
