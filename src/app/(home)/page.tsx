import { authOptions } from '@/lib/auth'
import { isMatch } from 'date-fns'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { TimeSelect } from './_components/time-select.component'
import { LastTransactions } from './_components/last-transactions.component'

interface HomePageProps {
  searchParams: {
    month: string
  }
}

export default function HomePage({ searchParams }: HomePageProps) {
  const { month } = searchParams
  const session = getServerSession(authOptions)
  if (!session) {
    redirect('login')
  }
  const monthIsInvalid = !month || !isMatch(month, 'MM')
  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`)
  }

  return (
    <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <TimeSelect />
      </div>
      <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
        <div className="flex flex-col gap-6 overflow-hidden">
          {/* Sumary Cards */}
          <div className="grid-col-3 grid h-full grid-rows-1 gap-6 overflow-hidden"></div>
        </div>
        <LastTransactions />
      </div>
    </div>
  )
}
