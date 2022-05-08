-- CreateTable
CREATE TABLE "oauth_apps" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "homepage" TEXT NOT NULL,
    "callback" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clientID" TEXT NOT NULL,

    CONSTRAINT "oauth_apps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "secrets" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "oauthAppId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "secrets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "oauth_apps_clientID_key" ON "oauth_apps"("clientID");

-- AddForeignKey
ALTER TABLE "oauth_apps" ADD CONSTRAINT "oauth_apps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "secrets" ADD CONSTRAINT "secrets_oauthAppId_fkey" FOREIGN KEY ("oauthAppId") REFERENCES "oauth_apps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
