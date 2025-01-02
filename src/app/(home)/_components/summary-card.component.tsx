import AddTransactionButton from '@/components/add-transaction-button.component'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ReactNode } from 'react'

interface SummaryCardProps {
  title: string
  amount: number
  icon: ReactNode
  size?: 'small' | 'medium' | 'large'
}

export function SummaryCard({
  title,
  amount,
  icon,
  size = 'small'
}: SummaryCardProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-4">
        {icon}
        <p
          className={`${size === 'small' ? 'text-muted-foreground' : 'text-white opacity-70'}`}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-0.5 md:flex-row">
        <p
          className={`${size === 'small' ? 'text-2xl' : 'text-4xl'} font-bold`}
        >
          {amount.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
        </p>
        {size === 'large' && <AddTransactionButton />}
      </CardContent>
    </Card>
  )
}
