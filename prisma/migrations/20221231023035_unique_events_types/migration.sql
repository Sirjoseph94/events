/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `EventType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EventType_name_key" ON "EventType"("name");
