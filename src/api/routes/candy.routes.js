import {Router} from "express";
import { getCandy } from "../controllers/candy.controllers.js";

const router = Router();

//Obtenemos candy disponibles
router.get("/", getCandy);



export default router;