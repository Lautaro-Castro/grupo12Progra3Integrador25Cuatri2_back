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
        //Creamos un array con los campos a validar
        const camposPelicula = ['nombre', 'sinopsis', 'duracion', 'clasificacion', 'fecha_estreno', 'poster_url', 'distribuidor', 'director', 'actores'];

        //Usamos filter para ver si alguno de los campos de la pelicula falta o no tiene datos en el req.body
        const camposFaltantes = camposPelicula.filter(campo => !req.body[campo]);
        /*
        Arriba decidimos crear un array y validar si tenia datos o existian mediante un filter porque al ser demasiados campos, realizar destructuring y escribir la validacion manualmente era sucio, difficil de leer y propensa a erroes de tipeo.
        */
        if(camposFaltantes.length > 0){
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los campos del formulario"
            });
        }
        let [rows] = await peliculaModels.insertPelicula(req.body);

        res.status(201).json({
            message: "Producto creado con exito",
            peliculaId: rows.insertId
        });
    } catch (error) {
        res.status(500).json({
            message: "Error interno al crear la pelicula"
        });
    }
}
