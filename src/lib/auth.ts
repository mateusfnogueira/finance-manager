import { PrismaAdapter } from '@auth/prisma-adapter'
import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { db } from './prisma'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-10-28.acacia'
})

async function checkSubscriptionStatus(customerId: string): Promise<boolean> {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'active'
  })

  return subscriptions.data.length > 0
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      let customerList = await stripe.customers.list({ email: user.email as string })

      if (customerList.data.length > 0) {
        const isActive = await checkSubscriptionStatus(customerList.data[0].id)

        user.subscription = isActive ? 'PREMIUM' : 'FREE'

        if (isActive) {
          await db.user.update({
            where: { email: user.email as string },
            data: {
              subscription: 'PREMIUM',
              stripeCustomerId: customerList.data[0].id
            }
          })
        }

        return true
      }

      const customer = await stripe.customers.create({
        email: user.email as string,
        metadata: {
          userId: user.id as string
        },
        name: user.name as string
      })

      await db.user.update({
        where: { email: user.email as string },
        data: {
          subscription: 'FREE',
          stripeCustomerId: customer.id
        }
      })

      return true
    },
    async session({ session, token, user }) {
      if (session && session.user) {
        session.user.id = user.id
        session.user.email = user.email
        session.user.subscription = user.subscription
        session.user.stripeCustomerId = user.stripeCustomerId
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    }
  },
  pages: {
    signIn: '/login',
    error: '/'
  }
}
