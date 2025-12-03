import funcionesModels from "../models/funciones.models.js";


export const getFuncionesPorIdPelicula = async (req, res) => {
    try {
        let preventa = req.esPreventa;
        let { formato_id, idioma_id, fecha} = req.query;
        const pelicula_id = req.params.id;

        //Normalizamos los parametros
       
        formato_id = formato_id ? parseInt(formato_id, 10) : null;
        idioma_id = idioma_id ? parseInt(idioma_id, 10) : null;

        const [rows] = await funcionesModels.getFuncionesPorIdPelicula(pelicula_id, preventa, formato_id, idioma_id, fecha);
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron funciones disponibles" : "Funciones disponibles"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error interno al obtener las funciones"
        });
    }
}

export const getFunciones = async (req, res) => {
    try {

        let {pelicula_id, preventa, formato_id, idioma_id, fecha} = req.query;
        
        //Normalizamos los parametros
        pelicula_id = pelicula_id ? parseInt(pelicula_id, 10) : null;
        preventa = preventa === "true";
        formato_id = formato_id ? parseInt(formato_id, 10) : null;
        idioma_id = idioma_id ? parseInt(idioma_id, 10) : null;

        const [rows] = await funcionesModels.getFunciones(pelicula_id, preventa, formato_id, idioma_id, fecha);
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron funciones disponibles" : "Funciones disponibles"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error interno al obtener las funciones"
        });
    }
}

export const getFuncionPorId = async (req, res) => {
    try {

        //Obtenemos la pelicula por id
        let {id} = req.params; // Esto nos permite obtener el valor numerico despues de peliculas

        const [rows] = await funcionesModels.getFuncionPorId(id);

        //Comprobamos que existe la pelicula con ese id
        if(rows.length === 0) {
            console.log("Error, no existe funcion con ese id");

            return res.status(404).json({
                message: `No se encontro funcion con id ${id}`
            });
        }
        
        res.status(200).json({
            payload: rows[0]
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Error interno al obtener funcion con id"
        });
    }
}

export const createFuncion = async (req, res) => {
    try {
        let [rows] = await funcionesModels.insertFuncion(req.body);
                res.status(201).json({
                    message: `Funcion creada con exito`,
                    funcionId: rows.insertId
                });

    } catch (error) {
        res.status(500).json({
            message: `Error interno al crear la funcion`
        });
    }
}


export const modifyFuncion = async (req, res) => {
    try {
        //Extraemos el id de la url
        let id = req.id;
        console.log("id funcion: ", id)
        //Extraemos los datos de la funcion
        let funcion = req.body;
        funcion = {...funcion, id: id}
        let [result] = await funcionesModels.updateFuncion(funcion);
        if(result.changedRows === 0){
            return res.status(200).json({
                message: "No se actualizo la funcion"
            });
        }

        res.status(202).json({
            message: "Funcion modificada con exito"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
}

export const removeFuncion = async (req, res) => {
    try {
        let id = req.id;
        let [result] = await funcionesModels.deleteFuncion(id);
        if(result.affectedRows === 0){
            return res.status(400).json({
                message: `No se encontro funcion con id: ${id}`
            });
        }

        return res.status(200).json({
            message: `Funcion con id ${id} eliminada exitosamente.`
        })
    } catch (error) {
        res.status(500).json({
            message: `Error al eliminar funcion con id: ${id}`,
            error: error.message
        })
    }
}