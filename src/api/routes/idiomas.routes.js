import { Router } from "express";
import { getIdiomas, getIdiomaPorId } from "../controllers/idiomas.controllers.js";
const router = Router();

//Obtenemos los formatos
router.get("/", getIdiomas);

//Obtenemos formato por id
router.get("/:id", getIdiomaPorId);

export default router;