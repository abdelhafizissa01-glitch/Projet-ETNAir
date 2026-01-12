import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { listUtilisateurs, updateUtilisateur, deleteUtilisateur } from "../controllers/utilisateurs.controller.js";
import { updateUtilisateurValidator } from "../validators/utilisateurs.validators.js";

const router = express.Router();

// Si tu veux rendre ça ADMIN-only plus tard, on le fera.
// Pour l’instant protégé par JWT.
router.get("/", verifyToken, listUtilisateurs);
router.put("/:id", verifyToken, updateUtilisateurValidator, updateUtilisateur);
router.delete("/:id", verifyToken, deleteUtilisateur);

export default router;
