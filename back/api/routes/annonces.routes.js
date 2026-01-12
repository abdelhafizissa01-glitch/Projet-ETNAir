import express from "express";
const router = express.Router();

// 👇 IMPORTANT : On met juste "/" ici.
// Car dans server.js on dira que ce fichier gère "/annonces"
router.get("/", (req, res) => {
    res.status(200).json({ message: "Bravo ! La route fonctionne !" });
});

export default router;