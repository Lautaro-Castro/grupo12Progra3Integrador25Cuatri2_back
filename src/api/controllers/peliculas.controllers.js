import peliculaModels from "../models/peliculas.models.js";

export const getPeliculasEnCartelera = async (req, res) => {
    try {
        
        const [rows] = await peliculaModels.getPeliculasEnCartelera();

        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron peliculas disponibles" : "Peliculas disponibles"
        })

    } catch (error) {

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

        res.status(500).json({
            message: "Error interno al obtener pelicula con id"
        });
    }
}

export const createPelicula = async (req, res) =>{
    try {
        
        let [rows] = await peliculaModels.insertPelicula(req.body);

        res.status(201).json({
            message: "Pelicula creado con exito",
            peliculaId: rows.insertId
        });
    } catch (error) {
        res.status(500).json({
            message: "Error interno al crear la pelicula"
        });
    }
}

export const modifyPelicula = async (req, res) => {
    try {
        //Extraemos el id de la url
        let id = req.id;
        //Extraemos los datos de la pelicula
        let pelicula = req.body;
        pelicula = {...pelicula, id: id}
        let [result] = await peliculaModels.updatePelicula(pelicula);
        if(result.changedRows === 0){
            return res.status(200).json({
                message: "No se actualizo la pelicula"
            });
        }

        res.status(202).json({
            message: "Pelicula modificada con exito"
        });
    } catch (error) {

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
}


export const removePelicula = async (req, res) => {
    try {
        let id = req.id;
        let [result] = await peliculaModels.deletePelicula(id);

        if(result.affectedRows === 0){
            return res.status(400).json({
                message: `No se encontro una pelicula con id: ${id}`
            });
        }

        return res.status(200).json({
            message: `Pelicula con id ${id} eliminada exitosamente.`
        })
    } catch (error) {

        res.status(500).json({
            message: `Error al eliminar la pelicula con id: ${id}`,
            error: error.message
        })
    }
}