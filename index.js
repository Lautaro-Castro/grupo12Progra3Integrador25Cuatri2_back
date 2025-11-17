//Se importamos las librerias que usara la app
import express from "express";
import cors from "cors";

//Creamos la app
const app = express();

// Importamos las rutas de pelicula y candy
import { peliculasRoutes } from "./src/api/routes/index.js";
import { candyRoutes } from "./src/api/routes/index.js";

//Se importa environments del archivo js y se obtiene el PORT
import environments from "./src/api/config/environments.js";
const PORT = environments.port;


/*===================
    Middlewares
====================*/
app.use(cors()); // Middleware CORS basico que permite todas las solicitudes
app.use(express.json()); // Middleware para parsear JSON en el body


/*===================
     PELICULAS
===================*/

app.use("/api/peliculas", peliculasRoutes);

/*===================
     CANDY
===================*/

//Consulta para obtener todos las productos disponibles
app.use("/api/candy", candyRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});