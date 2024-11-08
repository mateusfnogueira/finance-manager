'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@components/ui/button'
import { TrashIcon } from 'lucide-react'
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS
} from '@constants/transactions.constants'
import TransactionTypeBadge from '../_components/transaction-type-badge.component'
import EditTransactionButton from '../_components/edit-transaction-button.component'
import { deleteTransaction } from '@/actions/transaction/delete-transaction.action'
import { ITransaction } from '@/interfaces/transactions.interface'

export const transactionColumns: ColumnDef<ITransaction>[] = [
  {
    accessorKey: 'title',
    header: 'Nome'
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row: { original: transaction } }) => <TransactionTypeBadge transaction={transaction} />
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
    cell: ({ row: { original: transaction } }) => TRANSACTION_CATEGORY_LABELS[transaction.category]
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Método de Pagamento',
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod]
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row: { original: transaction } }) =>
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(Number(transaction.amount))
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row: { original: transaction } }) => {
      return (
        <div className="space-x-1">
          <EditTransactionButton transaction={transaction} />
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
            onClick={() => deleteTransaction(transaction.id)}
          >
            <TrashIcon />
          </Button>
        </div>
      )
    }
  }
]
