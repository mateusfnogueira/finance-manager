'use server'

import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Stripe from 'stripe'

export async function createStripeCheckout() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    throw new Error('User not authenticated')
  }

  const stripeId = session?.user?.stripeCustomerId
  const id = session?.user?.id

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe secret key not set')
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-10-28.acacia'
  })

  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscription`,
    currency: 'brl',
    subscription_data: {
      metadata: {
        userId: id as string
      }
    },
    customer: stripeId as string,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1
      }
    ]
  })

  return { sessionId: stripeSession.id }
}
