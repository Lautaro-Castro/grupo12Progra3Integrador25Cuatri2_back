import {Router} from "express";
import { getProductos, getCombos } from "../controllers/candy.controllers.js";

const router = Router();

//Obtenemos productos disponibles
router.get("/productos", getProductos);

//Obtenemos combos disponibles
router.get("/combos", getCombos);

export default router;