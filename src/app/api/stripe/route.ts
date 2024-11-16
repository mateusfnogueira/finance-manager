import { authOptions } from '@/lib/auth'
import { db } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.error()
  }

  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.error()
  }

  const text = await req.text()

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-10-28.acacia'
  })

  const event = stripe.webhooks.constructEvent(text, signature, process.env.STRIPE_WEBHOOK_SECRET)

  switch (event.type) {
    case 'invoice.paid': {
      const { subscription, subscription_details } = event.data.object

      const id = subscription_details?.metadata?.userId

      db.user.update({
        where: { id },
        data: {
          subscription: 'PREMIUM',
          stripeSubscriptionId: subscription as string
        }
      })

      const nextAuthSession = await getServerSession(authOptions)
      if (nextAuthSession) {
        nextAuthSession.user.subscription = 'PREMIUM'
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
