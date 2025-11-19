import { Router } from "express";
import { getFormatos, getFormatoPorId } from "../controllers/formatos.controllers.js";
const router = Router();

//Obtenemos los formatos
router.get("/", getFormatos);

//Obtenemos formato por id
router.get("/:id", getFormatoPorId);

export default router;