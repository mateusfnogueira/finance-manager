import { authOptions } from '@/lib/auth'
import { db } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { TotalExpensePerCategory, TransactionPercentagePerType } from './types'
import { TransactionType } from '@prisma/client'

export const getDashboard = async (month: string) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Unauthorized')
  }

  const where = {
    userId: session.user.id,
    date: {
      gte: new Date(month),
      lt: new Date(month)
    }
  }

  console.log(session.user.id)

  const allIncomes = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: 'INCOME'
        },
        _sum: {
          amount: true
        }
      })
    )._sum?.amount || 0
  )

  const allInvestments = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: 'INVESTMENT'
        },
        _sum: {
          amount: true
        }
      })
    )._sum?.amount || 0
  )

  const allOutcomes = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: 'OUTCOME'
        },
        _sum: {
          amount: true
        }
      })
    )._sum?.amount || 0
  )

  const allTransfers = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: 'TRANSFER'
        },
        _sum: {
          amount: true
        }
      })
    )._sum?.amount || 0
  )

  const totalTransactions = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: {
          amount: true
        }
      })
    )._sum?.amount || 0
  )

  const totalExpensesPerCategory: TotalExpensePerCategory[] = (
    await db.transaction.groupBy({
      by: ['category'],
      where: {
        ...where,
        type: 'OUTCOME'
      },
      _sum: {
        amount: true
      }
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: (Number(category._sum.amount) / allOutcomes) * 100
  }))

  const lastTransaction = await db.transaction.findMany({
    where,
    orderBy: {
      date: 'desc'
    },
    take: 15
  })

  const balance = allIncomes - allOutcomes - allInvestments - allTransfers

  const typePercentage: TransactionPercentagePerType = {
    [TransactionType.INCOME]: allIncomes || totalTransactions * 100,
    [TransactionType.INVESTMENT]: allInvestments || totalTransactions * 100,
    [TransactionType.OUTCOME]: allOutcomes || totalTransactions * 100,
    [TransactionType.TRANSFER]: allTransfers || totalTransactions * 100
  }

  return {
    allIncomes,
    allInvestments,
    allOutcomes,
    allTransfers,
    balance,
    totalTransactions,
    lastTransaction,
    typePercentage,
    totalExpensesPerCategory
  }
}
