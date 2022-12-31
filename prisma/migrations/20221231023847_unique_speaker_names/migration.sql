/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Speaker` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Speaker_name_key" ON "Speaker"("name");
