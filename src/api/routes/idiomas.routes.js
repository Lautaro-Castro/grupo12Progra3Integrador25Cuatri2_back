import { Router } from "express";
import { getIdiomas, getIdiomaPorId } from "../controllers/idiomas.controllers.js";
import { validateId } from "../middlewares/middlewares.js";
const router = Router();

//Obtenemos los formatos
router.get("/", getIdiomas);

//Obtenemos formato por id
router.get("/:id",validateId, getIdiomaPorId);

export default router;