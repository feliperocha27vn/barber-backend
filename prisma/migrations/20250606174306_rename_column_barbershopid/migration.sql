/*
  Warnings:

  - You are about to drop the column `barberShopId` on the `services` table. All the data in the column will be lost.
  - Added the required column `barber_shop_id` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_barberShopId_fkey";

-- AlterTable
ALTER TABLE "services" DROP COLUMN "barberShopId",
ADD COLUMN     "barber_shop_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_barber_shop_id_fkey" FOREIGN KEY ("barber_shop_id") REFERENCES "barber_shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
