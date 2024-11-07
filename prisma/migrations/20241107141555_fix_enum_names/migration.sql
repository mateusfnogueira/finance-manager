/*
  Warnings:

  - The values [UTILITIY] on the enum `TransactionCategory` will be removed. If these variants are still used in the database, this will fail.
  - The values [BITCOIN] on the enum `TransactionPaymentMethod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TransactionCategory_new" AS ENUM ('HOUSING', 'TRANSPORTATION', 'FOOD', 'ENTERTAINMENT', 'HEALTH', 'UTILITY', 'SALARY', 'EDUCATION', 'OTHER');
ALTER TABLE "Transaction" ALTER COLUMN "category" TYPE "TransactionCategory_new" USING ("category"::text::"TransactionCategory_new");
ALTER TYPE "TransactionCategory" RENAME TO "TransactionCategory_old";
ALTER TYPE "TransactionCategory_new" RENAME TO "TransactionCategory";
DROP TYPE "TransactionCategory_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TransactionPaymentMethod_new" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'BANK_SLIP', 'CASH', 'PIX', 'PAYPAL', 'CRYPTO', 'OTHER');
ALTER TABLE "Transaction" ALTER COLUMN "paymentMethod" TYPE "TransactionPaymentMethod_new" USING ("paymentMethod"::text::"TransactionPaymentMethod_new");
ALTER TYPE "TransactionPaymentMethod" RENAME TO "TransactionPaymentMethod_old";
ALTER TYPE "TransactionPaymentMethod_new" RENAME TO "TransactionPaymentMethod";
DROP TYPE "TransactionPaymentMethod_old";
COMMIT;
