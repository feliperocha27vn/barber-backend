-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "preco" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "barberShopId" TEXT NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_barberShopId_fkey" FOREIGN KEY ("barberShopId") REFERENCES "barber_shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
