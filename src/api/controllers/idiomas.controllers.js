import idiomasModels from "../models/idomas.models.js";

export const getIdiomas = async (req, res) => {
    try {
        const [rows] = await idiomasModels.getIdiomas();

        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontaron idiomas" : "Se encontraron idiomas"
        })
    } catch (error) {

        res.status(500).json({
            message: "Error interno al obtener los idiomas"
        });
    }
}

export const getIdiomaPorId = async (req,res) => {

    try {
        let {id} = req.params;
        const [rows] = await idiomasModels.getIdiomaPorId(id);

        if(rows.length === 0) {
            
            return res.status(404).json({
                message: `No se encontro idioma con id ${id}`
            });
        }

    } catch (error) {

        res.status(500).json({
            message: "Error interno al obtener el idioma por Id"
        });
    }
}