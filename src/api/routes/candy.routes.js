import {Router} from "express";
import { createCandy, getCandy, getCandyPorId, modifyCandy, removeCandy } from "../controllers/candy.controllers.js";
import { validarCamposCandy, validateId } from "../middlewares/middlewares.js";

const router = Router();

//Obtenemos candy disponibles
router.get("/", getCandy);

//Obtenemos candy disponibles
router.get("/:id", validateId , getCandyPorId);

//Endpoint para crear candy
router.post("/", validarCamposCandy, createCandy);

//Endpoint para modificar candy
router.put("/:id", validateId, validarCamposCandy, modifyCandy);

//Endpoint para eliminar candy
router.delete("/:id", validateId, removeCandy);

export default router;