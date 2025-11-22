//Se importamos las librerias que usara la app
import express from "express";
import cors from "cors";

//Creamos la app
const app = express();

// Importamos las rutas de pelicula y candy
import { candyRoutes, formatosRoutes, funcionesRoutes, idiomasRoutes, peliculasRoutes } from "./src/api/routes/index.js";

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

//Consulta para obtener los formatos
app.use("/api/formatos", formatosRoutes);

//Consulta para obtener idiomas
app.use("/api/idiomas", idiomasRoutes);

app.use("/api/funciones", funcionesRoutes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});