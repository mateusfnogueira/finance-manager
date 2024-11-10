import { TransactionCategory, TransactionType } from '@prisma/client'

export type TransactionPercentagePerType = {
  [key in TransactionType]: number
}

export interface Dashboard {
  allIncomes: number
  allInvestments: number
  allOutcomes: number
  transactionPercentagePerType: TransactionPercentagePerType
}

export interface TotalExpensePerCategory {
  category: TransactionCategory
  totalAmount: number
  percentageOfTotal: number
}
