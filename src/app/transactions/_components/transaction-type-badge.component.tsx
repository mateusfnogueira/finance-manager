import { ITransaction } from '@/interfaces/transactions.interface'
import { Badge } from '@components/ui/badge'
import { TransactionType } from '@prisma/client'
import { CircleIcon } from 'lucide-react'

interface TransactionTypeBadgeProps {
  transaction: ITransaction
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === TransactionType.INCOME) {
    return (
      <Badge className="bg-muted font-bold text-primary hover:bg-muted">
        <CircleIcon className="mr-2 fill-primary" size={10} />
        Depósito
      </Badge>
    )
  }
  if (transaction.type === TransactionType.OUTCOME) {
    return (
      <Badge className="font bold bg-danger text-danger bg-opacity-10">
        <CircleIcon className="fill-danger mr-2" size={10} />
        Despesa
      </Badge>
    )
  }
  if (transaction.type === TransactionType.TRANSFER) {
    return (
      <Badge className="font bold bg-cyan-700 bg-opacity-10 text-cyan-700">
        <CircleIcon className="mr-2 fill-cyan-700" size={10} />
        Despesa
      </Badge>
    )
  }
  return (
    <Badge className="font bold bg-white bg-opacity-10 text-white">
      <CircleIcon className="mr-2 fill-white" size={10} />
      Investimento
    </Badge>
  )
}

export default TransactionTypeBadge
