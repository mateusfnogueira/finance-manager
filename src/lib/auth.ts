import { PrismaAdapter } from '@auth/prisma-adapter'
import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { db } from './prisma'

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
    async session({ session, token, user }) {
      if (session && session.user) {
        session.user.id = user.id
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
