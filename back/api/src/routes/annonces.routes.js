import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  listAnnonces,
  getAnnonce,
  createAnnonce,
  updateAnnonce,
  deleteAnnonce,
} from "../controllers/annonces.controller.js";
import { createAnnonceValidator, updateAnnonceValidator } from "../validators/annonces.validators.js";

const router = express.Router();

router.get("/", listAnnonces);
router.get("/:id", getAnnonce);

// routes protégées
router.post("/", verifyToken, createAnnonceValidator, createAnnonce);
router.put("/:id", verifyToken, updateAnnonceValidator, updateAnnonce);
router.delete("/:id", verifyToken, deleteAnnonce);

export default router;
