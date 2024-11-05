-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'OUTCOME', 'TRANSFER', 'INVESTMENT');

-- CreateEnum
CREATE TYPE "TransactionCategory" AS ENUM ('HOUSING', 'TRANSPORTATION', 'FOOD', 'ENTERTAINMENT', 'HEALTH', 'UTILITIY', 'SALARY', 'EDUCATION', 'OTHER');

-- CreateEnum
CREATE TYPE "TransactionPaymentMethod" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'BANK_SLIP', 'CASH', 'PIX', 'PAYPAL', 'BITCOIN', 'OTHER');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "type" "TransactionType" NOT NULL,
    "category" "TransactionCategory" NOT NULL,
    "paymentMethod" "TransactionPaymentMethod" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
