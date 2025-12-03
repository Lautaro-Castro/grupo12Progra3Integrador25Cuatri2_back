import { Router } from "express";
import { createFuncion, getFunciones, getFuncionPorId, modifyFuncion, removeFuncion } from "../controllers/funciones.controllers.js";
import { validarCamposFuncion, validateId } from "../middlewares/middlewares.js";
const router = Router();

//Obtenemos las funciones
router.get("/", getFunciones);

//Obtenemos las funciones
router.get("/:id", validateId, getFuncionPorId);

//Endpoint para crear funcion
router.post("/", validarCamposFuncion, createFuncion);

//Endpoint para modificar funcion
router.put("/:id", validateId, validarCamposFuncion, modifyFuncion);

//Endpoint para eliminar funcion
router.delete("/:id", validateId, removeFuncion);

export default router;