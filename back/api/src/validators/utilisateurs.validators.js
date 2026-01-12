import { body } from "express-validator";

export const updateUtilisateurValidator = [
  body("nom").optional().isString().notEmpty().withMessage("Nom invalide"),
  body("tel").optional().isString().withMessage("Tel invalide"),
  body("genre").optional().isString().withMessage("Genre invalide"),
  body("date_de_naissance").optional().isISO8601().withMessage("Date invalide (ISO8601)"),
  body("is_active").optional().isBoolean().withMessage("is_active doit être un booléen"),
];
