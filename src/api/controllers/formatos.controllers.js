import formatosModels from "../models/formatos.models.js";

export const getFormatos = async (req, res) => {

    try {

        const [rows] = await formatosModels.getFormatos();
    
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron formatos disponibles" : "Formatos disponibles"
        })
    } catch (error) {
        //Mostramos por consola si hubo un error al obtener los formatos y enviamos la respuesta correspondiente con status 500
        console.error("Error al obtener los formatos", error);

        res.status(500).json({
            message: "Error interno al obtener los formatos"
        });
        }
}

export const getFormatoPorId = async (req, res) => {

    try {
        //Obtenemos el formato por id
        let {id} = req.params; // Esto nos permite obtener el valor numerico despues de formatos

        const [rows] = await formatosModels.getFormatoPorId(id);

        //Comprobamos que existe el formato con ese id
        if(rows.length === 0) {
            console.log("Error, no existe formato con ese id");

            return res.status(404).json({
                message: `No se encontro formato con id ${id}`
            });
        }

        res.status(200).json({
            payload: rows[0]
        });

    } catch (error) {
        //Mostramos por consola si hubo un error al obtener el formato por id y enviamos la respuesta correspondiente con status 500
        console.error("Error obteniendo formato con id", error.message);

        res.status(500).json({
            message: "Error interno al obtener formato con id"
        });
    }
}