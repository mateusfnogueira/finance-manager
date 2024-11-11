'use client'

import { TransactionPercentagePerType } from '@/actions/dashboard/types'
import { Card, CardContent } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { TransactionType } from '@prisma/client'
import { Pie, PieChart } from 'recharts'
import { PercentageItem } from './percentage-item.component'
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: 'Investido',
    color: '#FFFFFF'
  },
  [TransactionType.INCOME]: {
    label: 'Receita',
    color: '#55B02E'
  },
  [TransactionType.OUTCOME]: {
    label: 'Despesas',
    color: '#E93030'
  },
  [TransactionType.TRANSFER]: {
    label: 'Transferências',
    color: '#b325b3'
  }
} satisfies ChartConfig

interface TransactionPieChartProps {
  allIncomes: number
  allOutcomes: number
  allInvestments: number
  allTransfers: number
  typePercentage: TransactionPercentagePerType
}

export function TransactionsPieChart({
  allIncomes,
  allInvestments,
  allOutcomes,
  allTransfers,
  typePercentage
}: TransactionPieChartProps) {
  const chartData = [
    {
      type: TransactionType.INCOME,
      amount: allIncomes,
      color: '#55B02E'
    },
    {
      type: TransactionType.OUTCOME,
      amount: allOutcomes,
      color: '#E93030'
    },
    {
      type: TransactionType.INVESTMENT,
      amount: allInvestments,
      color: '#FFFFFF'
    },
    {
      type: TransactionType.TRANSFER,
      amount: allTransfers,
      color: '#b325b3'
    }
  ]
  return (
    <Card className="flex flex-col p-6">
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="amount" nameKey="type" innerRadius={60} />
          </PieChart>
        </ChartContainer>

        <div className="space-y-3">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            title="Receita"
            value={typePercentage[TransactionType.INCOME]}
          />
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
            title="Despesas"
            value={typePercentage[TransactionType.OUTCOME]}
          />
          <PercentageItem
            icon={<PiggyBankIcon size={16} />}
            title="Investido"
            value={typePercentage[TransactionType.INVESTMENT]}
          />
        </div>
      </CardContent>
    </Card>
  )
}
