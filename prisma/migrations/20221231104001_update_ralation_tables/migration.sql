/*
  Warnings:

  - You are about to drop the `_EventToEventType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventToSpeaker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Event_id_key";

-- DropIndex
DROP INDEX "Registration_id_key";

-- DropIndex
DROP INDEX "User_id_key";

-- DropIndex
DROP INDEX "_EventToEventType_B_index";

-- DropIndex
DROP INDEX "_EventToEventType_AB_unique";

-- DropIndex
DROP INDEX "_EventToSpeaker_B_index";

-- DropIndex
DROP INDEX "_EventToSpeaker_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_EventToEventType";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_EventToSpeaker";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Speaker" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" DATETIME NOT NULL,
    "eventId" TEXT,
    CONSTRAINT "Speaker_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Speaker" ("createdAt", "designation", "id", "name", "updatedAT") SELECT "createdAt", "designation", "id", "name", "updatedAT" FROM "Speaker";
DROP TABLE "Speaker";
ALTER TABLE "new_Speaker" RENAME TO "Speaker";
CREATE UNIQUE INDEX "Speaker_name_key" ON "Speaker"("name");
CREATE TABLE "new_EventType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "eventId" TEXT,
    CONSTRAINT "EventType_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_EventType" ("id", "name") SELECT "id", "name" FROM "EventType";
DROP TABLE "EventType";
ALTER TABLE "new_EventType" RENAME TO "EventType";
CREATE UNIQUE INDEX "EventType_name_key" ON "EventType"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
