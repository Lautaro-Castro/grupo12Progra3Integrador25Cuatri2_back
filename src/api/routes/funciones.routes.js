import { Router } from "express";
import { getFunciones } from "../controllers/funciones.controllers.js";
const router = Router();

//Obtenemos las funciones
router.get("/", getFunciones);

export default router;