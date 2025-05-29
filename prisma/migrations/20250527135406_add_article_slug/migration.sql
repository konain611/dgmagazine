-- Add the new column
ALTER TABLE "Article" ADD COLUMN     "slug" TEXT;

-- Assign default slugs to existing rows
-- You can customize this logic depending on your data
UPDATE "Article"
SET "slug" = LOWER(REPLACE("title", ' ', '-'))
WHERE "slug" IS NULL;

-- Make slug required and unique
ALTER TABLE "Article"
ALTER COLUMN "slug" SET NOT NULL;

CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");
