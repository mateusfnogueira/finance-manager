'use client'

import { createStripeCheckout } from '@/actions/checkout/create-stripe-checkout'
import { Button } from '@/components/ui/button'
import { loadStripe } from '@stripe/stripe-js'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export function AdquirePlanButton() {
  const user = useSession().data?.user
  const hasPremiumPlan = user?.subscription === 'PREMIUM'

  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout()

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error('Stripe publishable key not set')
    }

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

    if (!stripe) {
      throw new Error('Stripe not loaded')
    }

    await stripe.redirectToCheckout({ sessionId })
  }

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
