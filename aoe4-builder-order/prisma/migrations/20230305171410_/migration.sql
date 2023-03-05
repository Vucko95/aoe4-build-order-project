/*
  Warnings:

  - Added the required column `civilization` to the `BuildOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BuildOrder" ADD COLUMN     "civilization" TEXT NOT NULL;
