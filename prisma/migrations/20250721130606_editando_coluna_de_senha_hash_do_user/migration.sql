/*
  Warnings:

  - You are about to drop the column `senha_hash` on the `users` table. All the data in the column will be lost.
  - Added the required column `telefone` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "senha_hash",
ADD COLUMN     "telefone" TEXT NOT NULL;
