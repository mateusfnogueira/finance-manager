import { TransactionCategory, TransactionPaymentMethod, TransactionType } from '@prisma/client'

export interface ITransaction {
  id: string
  userId: string
  title: string
  description: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  paymentMethod: TransactionPaymentMethod
  date: Date
  createdAt: Date
  updatedAt: Date
}
