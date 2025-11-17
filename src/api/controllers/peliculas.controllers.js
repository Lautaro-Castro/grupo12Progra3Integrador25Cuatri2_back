import peliculaModels from "../models/peliculas.models.js";

export const getPeliculasEnCartelera = async (req, res) => {
    try {
        
        const [rows] = await peliculaModels.getPeliculasEnCartelera();

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
}

export const getPeliculasEnPreVenta = async (req, res) => {
    try {
        
        const [rows] = await peliculaModels.getPeliculasEnPreVenta();

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
}

export const getPeliculaPorId = async (req, res) => {

    try {
        //Obtenemos la pelicula por id
        let {id} = req.params; // Esto nos permite obtener el valor numerico despues de peliculas

        const [rows] = await peliculaModels.getPeliculaPorId(id);

        //Comprobamos que existe la pelicula con ese id
        if(rows.length === 0) {
            console.log("Error, no existe pelicula con ese id");

            return res.status(404).json({
                message: `No se encontro pelicula con id ${id}`
            });
        }

        res.status(200).json({
            payload: rows[0]
        });

    } catch (error) {
        //Mostramos por consola si hubo un error al obtener la pelicula por id y enviamos la respuesta correspondiente con status 500
        console.error("Error obteniendo pelicula con id", error.message);

        res.status(500).json({
            message: "Error interno al obtener pelicula con id"
        });
    }
}
