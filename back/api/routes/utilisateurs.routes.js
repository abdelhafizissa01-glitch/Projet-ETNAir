import express from "express";
import prisma from "../prisma/client.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, nom, password } = req.body;

    const utilisateur = await prisma.utilisateur.create({
      data: {
        email,
        nom,
        password
      }
    });

    res.status(201).json(utilisateur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const utilisateurs = await prisma.utilisateur.findMany();
    res.json(utilisateurs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
