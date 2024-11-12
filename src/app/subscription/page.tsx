import { getCurrentMonthTransactions } from '@/actions/transaction/get-current-month-transactions.action'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { authOptions } from '@/lib/auth'
import { CheckIcon, XIcon } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function SubscriptionPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect('/login')
  }
  const currentMonthTransactions = await getCurrentMonthTransactions()
  const hasPremiumPlan = session.user.subscriptionPlan === 'premium'

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Subscription</h1>
      <p>{hasPremiumPlan ? 'You have a premium subscription.' : 'You have a free subscription.'}</p>

      <div className="flex gap-6">
        <Card className="w-[450px]">
          <CardHeader className="border-b border-solid py-8">
            <h2 className="text-center text-2xl font-semibold">Free Plan</h2>
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl">R$</span>
              <span className="text-6xl">0</span>
              <span className="text-2xl text-muted-foreground">/mês</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 py-8">
            <div className="flex items-center gap-2">
              <CheckIcon className="text-primary" />
              <p>Apenas 10 transações por mês ({currentMonthTransactions}/10)</p>
            </div>
            <div className="flex items-center gap-2">
              <XIcon />
              <p>Relatório de IA</p>
            </div>
          </CardContent>
        </Card>

        <Card className="w-[450px]">
          <CardHeader className="relative border-b border-solid py-8">
            {hasPremiumPlan && (
              <Badge className="absolute left-4 top-12 bg-primary/10 text-primary">Ativo</Badge>
            )}
            <h2 className="text-center text-2xl font-semibold">Premium Plan</h2>
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl">R$</span>
              <span className="text-6xl font-semibold">19</span>
              <div className="text-2xl text-muted-foreground">/mês</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 py-8">
            <div className="flex items-center gap-2">
              <CheckIcon className="text-primary" />
              <p>Transações ilimitadas</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="text-primary" />
              <p>Relatórios de IA</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
