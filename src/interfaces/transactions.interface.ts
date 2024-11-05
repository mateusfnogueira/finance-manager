export interface ITrasaction {
  id: number
  userId: number
  title: string
  description: string
  amount: number
  type: 'income' | 'outcome' | 'transfer' | 'investment'
  paymentMethod: string
  date: Date
  category: string
  createdAt: Date
  updatedAt: Date
}
