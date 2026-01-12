import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { prisma } from "../prisma.js";

export async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { mail, nom, mot_de_passe, type } = req.body;

  try {
    const exists = await prisma.utilisateur.findUnique({ where: { mail } });
    if (exists) return res.status(409).json({ message: "Email déjà utilisé" });

    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    const user = await prisma.utilisateur.create({
      data: {
        mail,
        nom,
        mot_de_passe: hashedPassword,
        type,
        is_active: true,
      },
      select: { id: true, mail: true, nom: true, type: true, is_active: true },
    });

    return res.status(201).json(user);
  } catch (e) {
    return res.status(500).json({ message: "Erreur serveur", error: String(e) });
  }
}

export async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { mail, mot_de_passe } = req.body;

  try {
    const user = await prisma.utilisateur.findUnique({ where: { mail } });
    if (!user) return res.status(401).json({ message: "Email ou mot de passe incorrect" });

    const ok = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!ok) return res.status(401).json({ message: "Email ou mot de passe incorrect" });

    const token = jwt.sign(
      { userId: user.id, type: user.type },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      token,
      user: { id: user.id, mail: user.mail, nom: user.nom, type: user.type },
    });
  } catch (e) {
    return res.status(500).json({ message: "Erreur serveur", error: String(e) });
  }
}
