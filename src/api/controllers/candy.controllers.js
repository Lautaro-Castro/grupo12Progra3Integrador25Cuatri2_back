import candyModels from "../models/candy.models.js";

export const getProductos = async (req, res) => {
    try {
        //Obtenemos todos los productos activos
        const [rows] = await candyModels.getProductos();

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
}

export const getCombos = async (req, res) => {
    try {
        //Obtenemos todas los combos activos
        const [rows] = await candyModels.getCombos();

        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron combos disponibles" : "Combos disponibles"
        })

    } catch (error) {
        //Mostramos por consola si hubo un error al obtener los combos y enviamos la respuesta correspondiente con status 500
        console.error("Error al obtener los combos", error.message);

        res.status(500).json({
            message: "Error interno al obtener los combos"
        });
    }
}