'use server'

import { db } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export const deleteTransaction = async (id: string) => {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }
  await db.transaction.delete({
    where: {
      id
    }
  })
  revalidatePath('/transactions')
}
