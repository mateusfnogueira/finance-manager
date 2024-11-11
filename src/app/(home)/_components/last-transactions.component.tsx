import { Button } from '@/components/ui/button'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ITransaction } from '@/interfaces/transactions.interface'
import { TransactionType } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import { TRANSACTION_PAYMENT_METHOD_ICONS } from '@/constants/transactions.constants'
import { formatCurrency } from '@/utils/currency.util'

interface LastTransactionsProps {
  lastTransactions: ITransaction[]
}

export function LastTransactions({ lastTransactions }: LastTransactionsProps) {
  const getAmountColor = (transaction: ITransaction) => {
    if (transaction.type === TransactionType.OUTCOME) {
      return 'text-red-500'
    }
    if (transaction.type === TransactionType.INCOME) {
      return 'text-primary'
    }
    return 'text-white'
  }
  const getAmountPrefix = (transaction: ITransaction) => {
    if (transaction.type === TransactionType.INCOME) {
      return '+'
    }
    return '-'
  }
  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Últimas Transações</CardTitle>
        <Button variant="outline" className="rounded-full font-bold" asChild>
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {lastTransactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white bg-opacity-[3%] p-3 text-white">
                <Image
                  src={`/icons/${TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod as keyof typeof TRANSACTION_PAYMENT_METHOD_ICONS]}`}
                  height={20}
                  width={20}
                  alt="PIX"
                />
              </div>
              <div>
                <p className="text-sm font-bold">{transaction.title}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
            <p className={`text-sm font-bold ${getAmountColor(transaction)}`}>
              {getAmountPrefix(transaction)}
              {formatCurrency(Number(transaction.amount))}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  )
}
