-- CreateTable
CREATE TABLE "scores" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "current_score" INTEGER NOT NULL,
    "risk_level" TEXT,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "score_history" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "score_id" TEXT NOT NULL,
    "score_value" INTEGER NOT NULL,
    "reference_month" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "score_history_score_id_fkey" FOREIGN KEY ("score_id") REFERENCES "scores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "score_factors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "score_id" TEXT NOT NULL,
    "factor_type" TEXT NOT NULL,
    "impact_value" INTEGER,
    "description" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "score_factors_score_id_fkey" FOREIGN KEY ("score_id") REFERENCES "scores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "scores_user_id_idx" ON "scores"("user_id");
