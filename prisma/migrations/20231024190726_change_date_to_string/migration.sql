/*
  Warnings:

  - The primary key for the `Hydration` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Hydration" DROP CONSTRAINT "Hydration_pkey",
ALTER COLUMN "date" SET DATA TYPE TEXT,
ADD CONSTRAINT "Hydration_pkey" PRIMARY KEY ("date");
