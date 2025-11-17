import {Router} from "express";
import { getPeliculaPorId, getPeliculasEnCartelera, getPeliculasEnPreVenta } from "../controllers/peliculas.controllers.js";
const router = Router();

//Obtenemos peliculas en cartelera
router.get("/cartelera", getPeliculasEnCartelera);

//Obtenemos peliculas en preventa
router.get("/preventa", getPeliculasEnPreVenta);

//Obtenemos pelicula por id
router.get("/:id", getPeliculaPorId);


export default router;