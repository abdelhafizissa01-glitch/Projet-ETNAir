import { validationResult } from "express-validator";
import { prisma } from "../prisma.js";

export async function listUtilisateurs(req, res) {
  try {
    const users = await prisma.utilisateur.findMany({
      select: { id: true, mail: true, nom: true, tel: true, type: true, is_active: true },
    });
    return res.json(users);
  } catch (e) {
    return res.status(500).json({ message: "Erreur serveur", error: String(e) });
  }
}

export async function updateUtilisateur(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: "ID invalide" });

  try {
    const updated = await prisma.utilisateur.update({
      where: { id },
      data: req.body,
      select: { id: true, mail: true, nom: true, tel: true, type: true, is_active: true },
    });
    return res.json(updated);
  } catch (e) {
    if (String(e).includes("Record to update not found")) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }
    return res.status(500).json({ message: "Erreur serveur", error: String(e) });
  }
}

export async function deleteUtilisateur(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: "ID invalide" });

  try {
    await prisma.utilisateur.delete({ where: { id } });
    return res.json({ message: "Utilisateur supprimé" });
  } catch (e) {
    if (String(e).includes("Record to delete does not exist")) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }
    return res.status(500).json({ message: "Erreur serveur", error: String(e) });
  }
}
