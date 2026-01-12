CREATE TYPE "TYPE_UTILISATEUR" AS ENUM (
  'LOCATAIRE',
  'BAILLEUR',
  'ADMIN'
);

CREATE TYPE "TYPE_GENRE" AS ENUM (
  'HOMME',
  'FEMME',
  'AUTRE'
);

CREATE TYPE "TYPE_ETABLISSEMENT" AS ENUM (
  'RESIDENCE',
  'IMMEUBLE',
  'DOMAINE',
  'CAMPING',
  'VILLAGE_VACANCES',
  'RESORT'
);

CREATE TYPE "TYPE_LOGEMENT" AS ENUM (
  'APPARTEMENT',
  'STUDIO',
  'CHAMBRE',
  'LOFT',
  'DUPLEX',
  'MAISON',
  'VILLA',
  'BUNGALOW',
  'CHALET',
  'GITE',
  'TINY_HOUSE',
  'CABANE',
  'CABANE_ARBRES',
  'ROULOTTE',
  'CONTAINER',
  'DOME',
  'IGLOO',
  'MOULIN',
  'CHATEAU',
  'RIAD',
  'YOURTE',
  'TIPI',
  'TENTE',
  'LODGE',
  'PENICHE',
  'BATEAU',
  'HOTEL',
  'APPART_HOTEL',
  'CHAMBRE_HOTES',
  'AUBERGE'
);

CREATE TYPE "ETAT_RESERVATION" AS ENUM (
  'DEMANDE',
  'ACCEPTE',
  'ANNULE',
  'TERMINE'
);

CREATE TYPE "STATUT_PAIEMENT" AS ENUM (
  'EN_ATTENTE',
  'PAYE',
  'REMBOURSE',
  'ECHEC'
);

CREATE TYPE "MODE_PAIEMENT" AS ENUM (
  'CARTE',
  'PAYPAL',
  'VIREMENT',
  'STRIPE',
  'APPLE_PAY',
  'GOOGLE_PAY'
);

CREATE TYPE "TYPE_SERVICE" AS ENUM (
  'GENERAL',
  'CUISINE',
  'SECURITE',
  'DIVERTISSEMENT',
  'EXTERIEUR',
  'BUREAU',
  'LAVERIE',
  'BEBE',
  'ACCESSIBILITE'
);

CREATE TABLE "Utilisateur" (
  "id" SERIAL PRIMARY KEY,
  "url_photo" integer,
  "nom" varchar(50) NOT NULL,
  "mail" varchar(255) UNIQUE NOT NULL,
  "tel" varchar(20) UNIQUE,
  "mot_de_passe" varchar(255) NOT NULL,
  "date_de_naissance" date,
  "genre" "TYPE_GENRE",
  "type" "TYPE_UTILISATEUR" NOT NULL,
  "is_active" boolean NOT NULL DEFAULT true
);

CREATE TABLE "Etablissement" (
  "id" SERIAL PRIMARY KEY,
  "nom" varchar(255) NOT NULL,
  "type" "TYPE_ETABLISSEMENT" NOT NULL,
  "adresse" varchar(100) NOT NULL,
  "ville" varchar(100) NOT NULL,
  "code_postal" varchar(20) NOT NULL,
  "pays" varchar(100) NOT NULL,
  "latitude" decimal(10,8),
  "longitude" decimal(11,8),
  "description" text
);

CREATE TABLE "Annonce" (
  "id" SERIAL PRIMARY KEY,
  "etablissement_id" integer NOT NULL,
  "titre" varchar(255) NOT NULL,
  "description" text,
  "prix_par_nuit" decimal(10,2) NOT NULL,
  "capacite" integer NOT NULL,
  "superficie" integer,
  "type" "TYPE_LOGEMENT" NOT NULL,
  "date_creation" timestamp NOT NULL DEFAULT now(),
  "libre" boolean NOT NULL DEFAULT true
);

CREATE TABLE "Photo" (
  "id" SERIAL PRIMARY KEY,
  "url" varchar(255) NOT NULL,
  "annonce_id" integer
);

CREATE TABLE "Disponibilite" (
  "id" SERIAL PRIMARY KEY,
  "date_debut" date NOT NULL,
  "date_fin" date NOT NULL,
  "annonce_id" integer NOT NULL
);

CREATE TABLE "Reservation" (
  "id" SERIAL PRIMARY KEY,
  "annonce_id" integer NOT NULL,
  "utilisateur_id" integer NOT NULL,
  "etat" "ETAT_RESERVATION" NOT NULL DEFAULT 'DEMANDE'
);

CREATE TABLE "Avis" (
  "id" SERIAL PRIMARY KEY,
  "annonce_id" integer NOT NULL,
  "utilisateur_id" integer NOT NULL,
  "note" integer NOT NULL,
  "commentaire" text,
  "date_creation" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE "Paiement" (
  "id" SERIAL PRIMARY KEY,
  "reservation_id" integer NOT NULL,
  "montant" decimal(10,2) NOT NULL,
  "statut" "STATUT_PAIEMENT" NOT NULL DEFAULT 'EN_ATTENTE',
  "methode" "MODE_PAIEMENT" NOT NULL,
  "date_paiement" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE "Service" (
  "id" SERIAL PRIMARY KEY,
  "nom" varchar(255) NOT NULL,
  "description" text,
  "category" "TYPE_SERVICE" NOT NULL,
  "actif" boolean NOT NULL DEFAULT true
);

CREATE TABLE "AnnonceService" (
  "id" SERIAL PRIMARY KEY,
  "annonce_id" int NOT NULL,
  "service_id" int NOT NULL
);

CREATE UNIQUE INDEX ON "AnnonceService" ("annonce_id", "service_id");

-- Les commentaires et contraintes
COMMENT ON TABLE "Utilisateur" IS 'Utilisateur = locataire, bailleur, admin.';
COMMENT ON TABLE "Etablissement" IS 'Ex : résidence, immeuble, camping, resort.';
COMMENT ON TABLE "Annonce" IS 'Une annonce = un logement louable.';
COMMENT ON TABLE "Photo" IS '1 annonce = plusieurs photos (relation 1-N).';
COMMENT ON TABLE "Disponibilite" IS 'Périodes disponibles pour la réservation.';
COMMENT ON TABLE "Reservation" IS 'Une réservation lie un utilisateur à une annonce.';
COMMENT ON TABLE "Avis" IS 'Un utilisateur peut laisser un avis sur une annonce.';
COMMENT ON TABLE "Paiement" IS 'Chaque paiement est lié à une réservation.';
COMMENT ON TABLE "Service" IS 'Ex : WiFi, Parking, TV, Lave-linge, Sécurité...';
COMMENT ON TABLE "AnnonceService" IS 'Table pivot N-N entre Annonce et Service.';

ALTER TABLE "Utilisateur" ADD FOREIGN KEY ("url_photo") REFERENCES "Photo" ("id");
ALTER TABLE "Annonce" ADD FOREIGN KEY ("etablissement_id") REFERENCES "Etablissement" ("id");
ALTER TABLE "Photo" ADD FOREIGN KEY ("annonce_id") REFERENCES "Annonce" ("id");
ALTER TABLE "Disponibilite" ADD FOREIGN KEY ("annonce_id") REFERENCES "Annonce" ("id");
ALTER TABLE "Reservation" ADD FOREIGN KEY ("annonce_id") REFERENCES "Annonce" ("id");
ALTER TABLE "Reservation" ADD FOREIGN KEY ("utilisateur_id") REFERENCES "Utilisateur" ("id");
ALTER TABLE "Avis" ADD FOREIGN KEY ("annonce_id") REFERENCES "Annonce" ("id");
ALTER TABLE "Avis" ADD FOREIGN KEY ("utilisateur_id") REFERENCES "Utilisateur" ("id");
ALTER TABLE "Paiement" ADD FOREIGN KEY ("reservation_id") REFERENCES "Reservation" ("id");
ALTER TABLE "AnnonceService" ADD FOREIGN KEY ("annonce_id") REFERENCES "Annonce" ("id");
ALTER TABLE "AnnonceService" ADD FOREIGN KEY ("service_id") REFERENCES "Service" ("id");
