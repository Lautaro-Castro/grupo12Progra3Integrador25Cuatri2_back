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