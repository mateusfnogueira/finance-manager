'use server'

import { db } from '@/lib/prisma'
import { TransactionCategory, TransactionPaymentMethod, TransactionType } from '@prisma/client'
import { upsertTransactionSchema } from './schema'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

interface UpsertTransactionParams {
  id?: string
  userId?: string
  title: string
  description: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  paymentMethod: TransactionPaymentMethod
  date: Date
}

export const upsertTransaction = async (params: UpsertTransactionParams) => {
  upsertTransactionSchema.parse(params)
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }
  const userId = session.user.id
  await db.transaction.upsert({
    update: { ...params, userId },
    create: { ...params, userId },
    where: {
      id: params?.id ?? ''
    }
  })
  revalidatePath('/transactions')
}
