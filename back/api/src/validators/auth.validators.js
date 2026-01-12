import { body } from "express-validator";

export const registerValidator = [
  body("mail").isEmail().withMessage("Email invalide"),
  body("nom").notEmpty().withMessage("Le nom est obligatoire"),
  body("mot_de_passe")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
  body("type")
    .notEmpty()
    .withMessage("type requis (LOCATAIRE / BAILLEUR / ADMIN)"),
];

export const loginValidator = [
  body("mail").isEmail().withMessage("Email invalide"),
  body("mot_de_passe").notEmpty().withMessage("Mot de passe requis"),
];
