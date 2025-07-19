/*
  Warnings:

  - You are about to drop the column `users_id` on the `appointments` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_users_id_fkey";

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "users_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
