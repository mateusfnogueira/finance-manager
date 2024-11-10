import { SummaryCard } from '.'

import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon, WalletIcon } from 'lucide-react'

interface SumaryCardsProps {
  month: string
  balance: number
  allIncomes: number
  allOutcomes: number
  allInvestments: number
  allTransfers: number
}

export async function SummaryCards({
  month,
  balance,
  allIncomes,
  allOutcomes,
  allInvestments,
  allTransfers
}: SumaryCardsProps) {
  return (
    <div className="space-y-6">
      <SummaryCard icon={<WalletIcon size={16} />} title="Saldo" amount={balance} size="large" />

      <div className="grid grid-cols-2 gap-6">
        <SummaryCard icon={<TrendingUpIcon size={16} />} title="Receitas" amount={allIncomes} />
        <SummaryCard icon={<TrendingDownIcon size={16} />} title="Despesas" amount={allOutcomes} />
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investimentos"
          amount={allInvestments}
        />
        <SummaryCard icon={<WalletIcon size={16} />} title="Transferências" amount={allTransfers} />
      </div>
    </div>
  )
}
