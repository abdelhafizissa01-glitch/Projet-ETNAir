import { body } from "express-validator";

export const createAnnonceValidator = [
  body("etablissement_id").isInt().withMessage("etablissement_id requis"),
  body("titre").notEmpty().withMessage("titre requis"),
  body("prix_par_nuit").isFloat({ gt: 0 }).withMessage("prix_par_nuit > 0"),
  body("capacite").isInt({ gt: 0 }).withMessage("capacite > 0"),
  body("type").notEmpty().withMessage("type requis"),
  body("description").optional().isString(),
  body("superficie").optional().isInt({ gt: 0 }),
  body("libre").optional().isBoolean(),
];

export const updateAnnonceValidator = [
  body("etablissement_id").optional().isInt(),
  body("titre").optional().isString().notEmpty(),
  body("prix_par_nuit").optional().isFloat({ gt: 0 }),
  body("capacite").optional().isInt({ gt: 0 }),
  body("type").optional().isString(),
  body("description").optional().isString(),
  body("superficie").optional().isInt({ gt: 0 }),
  body("libre").optional().isBoolean(),
];
