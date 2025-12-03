import candyModels from "../models/candy.models.js";

export const getCandy = async (req, res) => {
    try {
        const {tipo} = req.query;
        if((!tipo) || (tipo != 'producto' && tipo != 'combo')){
            return res.status(400).json({
                message: "Tipo invalido. Debe ser 'producto' o 'combo'"
            })
        }

        const [rows] = await candyModels.getCandyPorTipo(tipo);

        res.status(200).json({
            payload: rows,
            message: rows.length === 0 
                ? `No se encontraron ${tipo}s disponibles` 
                : `${tipo}s disponibles`
        });

    } catch (error) {

        res.status(500).json({
            message: "Error interno al obtener los combos"
        });
    }
}

export const createCandy = async (req, res) => {
    //Creamos un array con los campos a validar
    const camposCandy = ['nombre', 'descripcion', 'precio', 'imagen_url', 'activo', 'tipo']
    //Usamos filter para ver si alguno de los campos de la pelicula falta o no  tiene datos en el req.body
    const camposFaltantes = camposCandy.filter(campo => !req.body[campo]);

    if(camposFaltantes.length > 0){
        return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los campos del formulario"
        });
    }
}
