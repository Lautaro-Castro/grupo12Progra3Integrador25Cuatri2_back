import { Router } from "express";
import { getFunciones, getFuncionesPorIdPelicula } from "../controllers/funciones.controllers.js";
import { isPreventa } from "../middlewares/middlewares.js";
const router = Router();

//Obtenemos las funciones
router.get("/",isPreventa, getFunciones);


export default router;