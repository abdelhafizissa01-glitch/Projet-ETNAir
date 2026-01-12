-- CreateEnum
CREATE TYPE "TYPE_UTILISATEUR" AS ENUM ('LOCATAIRE', 'BAILLEUR', 'ADMIN');

-- CreateEnum
CREATE TYPE "TYPE_GENRE" AS ENUM ('HOMME', 'FEMME', 'AUTRE');

-- CreateEnum
CREATE TYPE "TYPE_ETABLISSEMENT" AS ENUM ('RESIDENCE', 'IMMEUBLE', 'DOMAINE', 'CAMPING', 'VILLAGE_VACANCES', 'RESORT');

-- CreateEnum
CREATE TYPE "TYPE_LOGEMENT" AS ENUM ('APPARTEMENT', 'STUDIO', 'CHAMBRE', 'LOFT', 'DUPLEX', 'MAISON', 'VILLA', 'BUNGALOW', 'CHALET', 'GITE', 'TINY_HOUSE', 'CABANE', 'CABANE_ARBRES', 'ROULOTTE', 'CONTAINER', 'DOME', 'IGLOO', 'MOULIN', 'CHATEAU', 'RIAD', 'YOURTE', 'TIPI', 'TENTE', 'LODGE', 'PENICHE', 'BATEAU', 'HOTEL', 'APPART_HOTEL', 'CHAMBRE_HOTES', 'AUBERGE');

-- CreateEnum
CREATE TYPE "ETAT_RESERVATION" AS ENUM ('DEMANDE', 'ACCEPTE', 'ANNULE', 'TERMINE');

-- CreateEnum
CREATE TYPE "STATUT_PAIEMENT" AS ENUM ('EN_ATTENTE', 'PAYE', 'REMBOURSE', 'ECHEC');

-- CreateEnum
CREATE TYPE "MODE_PAIEMENT" AS ENUM ('CARTE', 'PAYPAL', 'VIREMENT', 'STRIPE', 'APPLE_PAY', 'GOOGLE_PAY');

-- CreateEnum
CREATE TYPE "TYPE_SERVICE" AS ENUM ('GENERAL', 'CUISINE', 'SECURITE', 'DIVERTISSEMENT', 'EXTERIEUR', 'BUREAU', 'LAVERIE', 'BEBE', 'ACCESSIBILITE');

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(50) NOT NULL,
    "mail" VARCHAR(255) NOT NULL,
    "tel" VARCHAR(20),
    "mot_de_passe" VARCHAR(255) NOT NULL,
    "date_de_naissance" TIMESTAMP(3),
    "genre" "TYPE_GENRE",
    "type" "TYPE_UTILISATEUR" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "photo_profil_id" INTEGER,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Etablissement" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(255) NOT NULL,
    "type" "TYPE_ETABLISSEMENT" NOT NULL,
    "adresse" VARCHAR(100) NOT NULL,
    "ville" VARCHAR(100) NOT NULL,
    "code_postal" VARCHAR(20) NOT NULL,
    "pays" VARCHAR(100) NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "description" TEXT,

    CONSTRAINT "Etablissement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Annonce" (
    "id" SERIAL NOT NULL,
    "titre" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "prix_par_nuit" DOUBLE PRECISION NOT NULL,
    "capacite" INTEGER NOT NULL,
    "superficie" INTEGER,
    "type" "TYPE_LOGEMENT" NOT NULL,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "libre" BOOLEAN NOT NULL DEFAULT true,
    "etablissement_id" INTEGER NOT NULL,

    CONSTRAINT "Annonce_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "annonce_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disponibilite" (
    "id" SERIAL NOT NULL,
    "date_debut" TIMESTAMP(3) NOT NULL,
    "date_fin" TIMESTAMP(3) NOT NULL,
    "annonce_id" INTEGER NOT NULL,

    CONSTRAINT "Disponibilite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "etat" "ETAT_RESERVATION" NOT NULL DEFAULT 'DEMANDE',
    "annonce_id" INTEGER NOT NULL,
    "utilisateur_id" INTEGER NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avis" (
    "id" SERIAL NOT NULL,
    "note" INTEGER NOT NULL,
    "commentaire" TEXT,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "annonce_id" INTEGER NOT NULL,
    "utilisateur_id" INTEGER NOT NULL,

    CONSTRAINT "Avis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paiement" (
    "id" SERIAL NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "statut" "STATUT_PAIEMENT" NOT NULL DEFAULT 'EN_ATTENTE',
    "methode" "MODE_PAIEMENT" NOT NULL,
    "date_paiement" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reservation_id" INTEGER NOT NULL,

    CONSTRAINT "Paiement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "category" "TYPE_SERVICE" NOT NULL,
    "actif" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnnonceService" (
    "id" SERIAL NOT NULL,
    "annonce_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,

    CONSTRAINT "AnnonceService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_mail_key" ON "Utilisateur"("mail");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_tel_key" ON "Utilisateur"("tel");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_photo_profil_id_key" ON "Utilisateur"("photo_profil_id");

-- CreateIndex
CREATE UNIQUE INDEX "AnnonceService_annonce_id_service_id_key" ON "AnnonceService"("annonce_id", "service_id");

-- AddForeignKey
ALTER TABLE "Utilisateur" ADD CONSTRAINT "Utilisateur_photo_profil_id_fkey" FOREIGN KEY ("photo_profil_id") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Annonce" ADD CONSTRAINT "Annonce_etablissement_id_fkey" FOREIGN KEY ("etablissement_id") REFERENCES "Etablissement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_annonce_id_fkey" FOREIGN KEY ("annonce_id") REFERENCES "Annonce"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disponibilite" ADD CONSTRAINT "Disponibilite_annonce_id_fkey" FOREIGN KEY ("annonce_id") REFERENCES "Annonce"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_annonce_id_fkey" FOREIGN KEY ("annonce_id") REFERENCES "Annonce"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avis" ADD CONSTRAINT "Avis_annonce_id_fkey" FOREIGN KEY ("annonce_id") REFERENCES "Annonce"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avis" ADD CONSTRAINT "Avis_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paiement" ADD CONSTRAINT "Paiement_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnonceService" ADD CONSTRAINT "AnnonceService_annonce_id_fkey" FOREIGN KEY ("annonce_id") REFERENCES "Annonce"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnonceService" ADD CONSTRAINT "AnnonceService_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
