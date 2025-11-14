//Se importa express y se crea la app
import express from "express";
const app = express();

//Se importa environments del archivo js y se btiene el PORT
import environments from "./src/api/config/environments.js";
const PORT = environments.port;

//Se importa la conexion a la BD
import connection from "./src/api/database/db.js";

import cors from "cors";
app.use(cors());

/*===================
     PELICULAS
===================*/
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