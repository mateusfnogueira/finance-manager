'use server'

import { authOptions } from '@/lib/auth'
import { db } from '@/lib/prisma'
import { endOfMonth, startOfMonth } from 'date-fns'
import { getServerSession } from 'next-auth'

export const getCurrentMonthTransactions = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const { user } = session

  return db.transaction.count({
    where: {
      userId: user.id,
      AND: {
        createdAt: {
          gte: startOfMonth(new Date()),
          lt: endOfMonth(new Date())
        }
      }
    }
  })
}
