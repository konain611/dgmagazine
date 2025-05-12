-- CreateTable
CREATE TABLE "PartnerForm" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "streetAddress" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "companyName" TEXT,
    "interests" TEXT[],
    "comments" TEXT,

    CONSTRAINT "PartnerForm_pkey" PRIMARY KEY ("id")
);
