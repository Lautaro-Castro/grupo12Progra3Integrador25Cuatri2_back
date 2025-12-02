import { Router } from "express";
import { getFormatos, getFormatoPorId } from "../controllers/formatos.controllers.js";
import { validateId } from "../middlewares/middlewares.js";

const router = Router();

//Obtenemos los formatos
router.get("/", getFormatos);

//Obtenemos formato por id
router.get("/:id", validateId, getFormatoPorId);

export default router;