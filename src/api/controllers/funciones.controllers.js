import funcionesModels from "../models/funciones.models.js";

export const getFunciones = async (req, res) => {
    try {

        let {pelicula_id, preventa, formato_id, idioma_id, fecha} = req.query;

        //Validamos que se haya enviado un pelicula_id porque es obligatorio
        if(!pelicula_id || !preventa){
            res.status(400).json({
                message: "Error el parametro pelicula_id y preventa son obligatorios."
            });
            return;
        }

        //Normalizamos los parametros
        pelicula_id = parseInt(pelicula_id, 10);
        preventa = parseInt(preventa, 10);
        formato_id = formato_id ? parseInt(formato_id, 10) : null;
        idioma_id = idioma_id ? parseInt(idioma_id, 10) : null;

        const [rows] = await funcionesModels.getFunciones(pelicula_id, preventa, formato_id, idioma_id, fecha);

        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron funciones disponibles" : "Funciones disponibles"
        });

    } catch (error) {
        console.error("Error al obtener las funciones", error);

        res.status(500).json({
            message: "Error interno al obtener las funciones"
        });
    }
    
}