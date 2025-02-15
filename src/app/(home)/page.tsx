import { authOptions } from '@/lib/auth'
import { isMatch } from 'date-fns'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import { getDashboard } from '@/actions/dashboard/get-dashboard.action'
import {
  LastTransactions,
  TimeSelect,
  SummaryCards,
  TransactionsPieChart,
  ExpensesPerCategory
} from './_components'

interface HomePageProps {
  searchParams: {
    month: string
  }
}

export default async function HomePage({
  searchParams
}: HomePageProps) {
  const { month } = searchParams
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('login')
  }
  const monthIsInvalid = !month || !isMatch(month, 'MM')
  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`)
  }

  const dashboard = await getDashboard(month)

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-3">
          <TimeSelect />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <div className="flex flex-col gap-6">
          <SummaryCards month={month} {...dashboard} />
          <div className="flex flex-col gap-6 md:flex-row">
            <TransactionsPieChart {...dashboard} />
            <ExpensesPerCategory
              expensesPerCategory={dashboard.totalExpensesPerCategory}
            />
          </div>
        </div>
        <LastTransactions
          lastTransactions={dashboard.lastTransaction}
        />
      </div>
    </div>
  )
}
