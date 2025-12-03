import { Router } from "express";
import { createFuncion, getFunciones, modifyFuncion, removeFuncion } from "../controllers/funciones.controllers.js";
import { validarCamposFuncion, validateId } from "../middlewares/middlewares.js";
const router = Router();

//Obtenemos las funciones
router.get("/", getFunciones);

//Endpoint para crear candy
router.post("/", validarCamposFuncion, createFuncion);

//Endpoint para modificar candy
router.put("/:id", validarCamposFuncion, modifyFuncion);

//Endpoint para eliminar candy
router.delete("/:id", validateId, removeFuncion);

export default router;