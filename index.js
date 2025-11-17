//Se importamos las librerias que usara la app
import express from "express";
import cors from "cors";

//Creamos la app
const app = express();
// Importamos las rutas de producto
import { peliculasRoutes } from "./src/api/routes/index.js";

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
/*
//Consulta para obtener todas las peliculas disponibles en cartelera
app.get("/peliculas", async (req, res) => {

    try {
        //Obtenemos todas las peliculas activas
        const sql = `SELECT * FROM peliculas WHERE activa = 1`;
        const [rows] = await connection.query(sql);
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron peliculas disponibles" : "Peliculas disponibles"
        })

    } catch (error) {
        //Mostramos por consola si hubo un error al obtener las peliculas y enviamos la respuesta correspondiente con status 500
        console.error("Error al obtener las peliculas", error);

        res.status(500).json({
            message: "Error interno al obtener las peliculas"
        });
    }
});

//Consulta para obtener todas las peliculas a estrenar
app.get("/peliculasAEstrenar", async (req, res) => {

    try {
        //Obtenemos todas las peliculas activas
        const sql = `SELECT * FROM peliculas WHERE fecha_estreno > CURDATE()`;
        const [rows] = await connection.query(sql);
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron peliculas disponibles" : "Peliculas disponibles"
        })

    } catch (error) {
        //Mostramos por consola si hubo un error al obtener las peliculas y enviamos la respuesta correspondiente con status 500
        console.error("Error al obtener las peliculas", error);

        res.status(500).json({
            message: "Error interno al obtener las peliculas"
        });
    }
});

//Consulta para obtener pelicula por id
app.get("/peliculas/:id", async (req, res) => {

    try {
        //Obtenemos la pelicula por id
        let {id} = req.params; // Esto nos permite obtener el valor numerico despues de peliculas

        const sql = `SELECT * FROM peliculas WHERE id = ?`;
        const [rows] = await connection.query(sql, [id]);

        if(rows.length === 0) {
            console.log("Error, no existe peliucla con ese id");

            return res.status(404).json({
                message: `No se encontro pelicula con id ${id}`
            });
        }

        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        //Mostramos por consola si hubo un error al obtener las peliculas y enviamos la respuesta correspondiente con status 500
        console.error("Error obteniendo pelicula con id", error.message);

        res.status(500).json({
            message: "Error interno al obtener pelicula con id"
        });
    }
});
*/
/*===================
     CANDY
===================*/

//Consulta para obtener todos las productos disponibles
app.get("/productos", async (req, res) => {

    try {
        //Obtenemos todas los productos activos
        const sql = `SELECT * FROM candy WHERE activo = 1 AND tipo = 'producto'`;
        const [rows] = await connection.query(sql);
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos disponibles" : "Productos disponibles"
        })

    } catch (error) {
        //Mostramos por consola si hubo un error al obtener los productos y enviamos la respuesta correspondiente con status 500
        console.error("Error al obtener los productos", error);

        res.status(500).json({
            message: "Error interno al obtener los productos"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});