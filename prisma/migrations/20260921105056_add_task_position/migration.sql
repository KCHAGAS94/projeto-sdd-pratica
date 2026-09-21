-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "position" INTEGER;

-- Backfill position from existing creation order
WITH ordered AS (
  SELECT "id", ROW_NUMBER() OVER (ORDER BY "createdAt" ASC) - 1 AS "rn"
  FROM "Task"
)
UPDATE "Task"
SET "position" = ordered."rn"
FROM ordered
WHERE "Task"."id" = ordered."id";

-- Enforce NOT NULL now that all rows are backfilled
ALTER TABLE "Task" ALTER COLUMN "position" SET NOT NULL;
