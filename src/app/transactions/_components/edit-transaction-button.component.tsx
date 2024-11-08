'use client'

import { Button } from '@components/ui/button'
import UpsertTransactionDialog from '@components/transaction-dialog.component'
import { PencilIcon } from 'lucide-react'
import { useState } from 'react'
import { ITransaction } from '@/interfaces/transactions.interface'

interface EditTransactionButtonProps {
  transaction: ITransaction
}

const EditTransactionButton = ({ transaction }: EditTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
      </Button>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{
          ...transaction,
          amount: Number(transaction.amount)
        }}
        transactionId={transaction.id}
      />
    </>
  )
}

export default EditTransactionButton
