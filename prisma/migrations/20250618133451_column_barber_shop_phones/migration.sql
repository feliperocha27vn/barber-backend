-- CreateTable
CREATE TABLE "barber_shop_phones" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "barber_shop_id" TEXT NOT NULL,

    CONSTRAINT "barber_shop_phones_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "barber_shop_phones" ADD CONSTRAINT "barber_shop_phones_barber_shop_id_fkey" FOREIGN KEY ("barber_shop_id") REFERENCES "barber_shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
