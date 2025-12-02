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

        res.status(500).json({
            message: "Error interno al obtener los combos"
        });
    }
}