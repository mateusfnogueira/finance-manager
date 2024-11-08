import { db } from '@/lib/prisma'
import { DataTable } from '@/components/ui/data-table'

import { transactionColumns } from './_columns'
import AddTransactionButton from '@components/add-transaction-button.component'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function TransactionsPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('login')
  }
  const { user } = session
  const transactions = await db.transaction.findMany({
    where: {
      userId: user.id
    }
  })
  const plainTransactions = transactions.map((transaction) => ({
    ...transaction,
    amount: transaction.amount.toNumber()
  }))
  return (
    <div className="space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>
      <DataTable columns={transactionColumns} data={plainTransactions} />
    </div>
  )
}
