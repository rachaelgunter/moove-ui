-- CreateTable
CREATE TABLE "BusinessVertical" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobFunction" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessVertical.name_unique" ON "BusinessVertical"("name");

-- CreateIndex
CREATE UNIQUE INDEX "JobFunction.name_unique" ON "JobFunction"("name");
