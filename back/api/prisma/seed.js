import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  console.log("⚡ Cleaning database...");

  await prisma.avis.deleteMany();
  await prisma.paiement.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.annonceService.deleteMany();
  await prisma.disponibilite.deleteMany();
  await prisma.photo.deleteMany();
  await prisma.annonce.deleteMany();
  await prisma.etablissement.deleteMany();
  await prisma.utilisateur.deleteMany();
  await prisma.service.deleteMany();

  console.log("✅ Database cleaned");

  // ---------------------------
  // 1. UTILISATEURS (20)
  // ---------------------------
  const utilisateurs = [];
  for (let i = 1; i <= 20; i++) {
    const user = await prisma.utilisateur.create({
      data: {
        nom: `Utilisateur ${i}`,
        mail: `user${i}@mail.com`,
        mot_de_passe: "password",
        genre: i % 2 === 0 ? "HOMME" : "FEMME",
        type: i <= 8 ? "BAILLEUR" : "LOCATAIRE",
        date_de_naissance: new Date(1980 + rand(0, 20), rand(0, 11), rand(1, 28)),
        photo_profil: i % 2 === 0 ? {
          create: {
            url: `https://picsum.photos/200/200?profile=${i}`,
          },
        } : undefined,
      },
    });

    utilisateurs.push(user);
  }

  // ---------------------------
  // 2. ETABLISSEMENTS (10)
  // ---------------------------
  const etablissements = [];
  for (let i = 1; i <= 10; i++) {
    const etab = await prisma.etablissement.create({
      data: {
        nom: `Etablissement ${i}`,
        type: "RESIDENCE",
        adresse: `${i} rue Exemple`,
        ville: "Paris",
        code_postal: "75000",
        pays: "France",
        description: `Description établissement ${i}`,
      },
    });
    etablissements.push(etab);
  }

  // ---------------------------
  // 3. SERVICES
  // ---------------------------
  const services = await Promise.all([
    prisma.service.create({ data: { nom: "Wifi", category: "GENERAL" } }),
    prisma.service.create({ data: { nom: "Piscine", category: "DIVERTISSEMENT" } }),
    prisma.service.create({ data: { nom: "Petit-déjeuner", category: "CUISINE" } }),
    prisma.service.create({ data: { nom: "Parking", category: "EXTERIEUR" } }),
    prisma.service.create({ data: { nom: "Sécurité", category: "SECURITE" } }),
  ]);

  // ---------------------------
  // 4. ANNONCES (30+)
  // ---------------------------
  const annonces = [];
  let annonceIndex = 1;
  const bailleurs = utilisateurs.filter(u => u.type === "BAILLEUR");

  for (const bailleur of bailleurs) {
    const nbAnnonces = rand(2, 5);
    for (let i = 0; i < nbAnnonces; i++) {
      const annonce = await prisma.annonce.create({
        data: {
          titre: `Annonce ${annonceIndex}`,
          description: `Description annonce ${annonceIndex}`,
          prix_par_nuit: rand(30, 300),
          capacite: rand(1, 8),
          type: "APPARTEMENT",
          etablissement_id: etablissements[rand(0, etablissements.length - 1)].id,
        },
      });
      annonces.push(annonce);
      annonceIndex++;
    }
  }

  // ---------------------------
  // 5. PHOTOS ANNONCES
  // ---------------------------
  for (const annonce of annonces) {
    const nbPhotos = rand(2, 4);
    for (let i = 0; i < nbPhotos; i++) {
      await prisma.photo.create({
        data: {
          url: `https://picsum.photos/400/300?annonce=${annonce.id}-${i}`,
          annonce: {
            connect: { id: annonce.id },
          },
        },
      });
    }
  }

  // ---------------------------
  // 6. DISPONIBILITES
  // ---------------------------
  for (const annonce of annonces) {
    await prisma.disponibilite.createMany({
      data: [
        { annonce_id: annonce.id, date_debut: new Date("2026-01-01"), date_fin: new Date("2026-01-10") },
        { annonce_id: annonce.id, date_debut: new Date("2026-02-01"), date_fin: new Date("2026-02-15") },
      ],
    });
  }

  // ---------------------------
  // 7. SERVICES PAR ANNONCE
  // ---------------------------
  for (const annonce of annonces) {
    const shuffled = services.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, rand(1, 4));
    for (const service of selected) {
      await prisma.annonceService.create({
        data: { annonce_id: annonce.id, service_id: service.id },
      });
    }
  }

  // ---------------------------
  // 8. RESERVATIONS + PAIEMENTS
  // ---------------------------
  const locataires = utilisateurs.filter(u => u.type === "LOCATAIRE");
  for (let i = 0; i < 20; i++) {
    const reservation = await prisma.reservation.create({
      data: {
        annonce_id: annonces[rand(0, annonces.length - 1)].id,
        utilisateur_id: locataires[rand(0, locataires.length - 1)].id,
        etat: i % 2 === 0 ? "ACCEPTE" : "DEMANDE",
      },
    });

    await prisma.paiement.create({
      data: {
        reservation_id: reservation.id,
        montant: rand(50, 500),
        statut: "PAYE",
        methode: "CARTE",
      },
    });
  }

  // ---------------------------
  // 9. AVIS
  // ---------------------------
  for (let i = 0; i < 15; i++) {
    await prisma.avis.create({
      data: {
        annonce_id: annonces[rand(0, annonces.length - 1)].id,
        utilisateur_id: locataires[rand(0, locataires.length - 1)].id,
        note: rand(3, 5),
        commentaire: "Très bon séjour",
      },
    });
  }

  console.log("✅ Massive seed completed successfully");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
