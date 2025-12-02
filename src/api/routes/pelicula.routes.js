import {Router} from "express";
import { getPeliculaPorId, getPeliculasEnCartelera, getPeliculasEnPreVenta, createPelicula } from "../controllers/peliculas.controllers.js";
import { getFuncionesPorIdPelicula } from "../controllers/funciones.controllers.js";
import { isPreventa, validateId } from "../middlewares/middlewares.js";


const router = Router();

//Obtenemos peliculas en cartelera
router.get("/cartelera", getPeliculasEnCartelera);

//Obtenemos peliculas en preventa
router.get("/preventa", getPeliculasEnPreVenta);

//Obtenemos pelicula por id
router.get("/:id",validateId , getPeliculaPorId);

//Obtenemos las funciones de una pelicula mediante su Id
router.get("/:id/funciones", validateId, isPreventa, getFuncionesPorIdPelicula);

//Endpoint para agrear una pelicula nueva
router.post("/", createPelicula);

export default router;