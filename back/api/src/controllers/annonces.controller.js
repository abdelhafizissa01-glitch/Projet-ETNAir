import { validationResult } from "express-validator";
import { prisma } from "../prisma.js";

export async function listAnnonces(req, res) {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);
  const skip = (page - 1) * limit;

  const ville = req.query.ville;
  const prixMax = req.query.prixMax ? Number(req.query.prixMax) : undefined;
  const type = req.query.type;

  const where = {
    ...(type ? { type } : {}),
    ...(prixMax ? { prix_par_nuit: { lte: prixMax } } : {}),
    ...(ville
      ? { etablissement: { ville: { contains: ville, mode: "insensitive" } } }
      : {}),
  };

  try {
    const [total, data] = await Promise.all([
      prisma.annonce.count({ where }),
      prisma.annonce.findMany({
        where,
        skip,
        take: limit,
        include: { etablissement: true, photos: true },
        orderBy: { date_creation: "desc" },
      }),
    ]);

    return res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data,
    });
  } catch (e) {
    return res.status(500).json({ message: "Erreur serveur", error: String(e) });
  }
}

export async function getAnnonce(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: "ID invalide" });

  try {
    const annonce = await prisma.annonce.findUnique({
      where: { id },
      include: {
        etablissement: true,
        photos: true,
        annonceServices: { include: { service: true } },
        avis: true,
      },
    });

    if (!annonce) return res.status(404).json({ message: "Annonce introuvable" });
    return res.json(annonce);
  } catch (e) {
    return res.status(500).json({ message: "Erreur serveur", error: String(e) });
  }
}

export async function createAnnonce(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const annonce = await prisma.annonce.create({ data: req.body });
    return res.status(201).json(annonce);
  } catch (e) {
    return res.status(500).json({ message: "Erreur serveur", error: String(e) });
  }
}

export async function updateAnnonce(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: "ID invalide" });

  try {
    const annonce = await prisma.annonce.update({
      where: { id },
      data: req.body,
    });
    return res.json(annonce);
  } catch (e) {
    if (String(e).includes("Record to update not found")) {
      return res.status(404).json({ message: "Annonce introuvable" });
    }
    return res.status(500).json({ message: "Erreur serveur", error: String(e) });
  }
}

export async function deleteAnnonce(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: "ID invalide" });

  try {
    await prisma.annonce.delete({ where: { id } });
    return res.json({ message: "Annonce supprimée" });
  } catch (e) {
    if (String(e).includes("Record to delete does not exist")) {
      return res.status(404).json({ message: "Annonce introuvable" });
    }
    return res.status(500).json({ message: "Erreur serveur", error: String(e) });
  }
}
