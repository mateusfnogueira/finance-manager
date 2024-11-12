'use client'

import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export function AdquirePlanButton() {
  const user = useSession().data?.user
  const hasPremiumPlan = user?.subscriptionPlan === 'premium'

  const handleAcquirePlanClick = () => {}

  if (hasPremiumPlan) {
    return (
      <Button className="w-full rounded-full font-bold" variant="link">
        <Link
          href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user.email}`}
        >
          Gerenciar plano
        </Link>
      </Button>
    )
  }
  return (
    <Button className="w-full rounded-full font-bold" onClick={handleAcquirePlanClick}>
      Adquirir plano
    </Button>
  )
}
