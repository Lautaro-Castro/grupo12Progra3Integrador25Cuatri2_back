import idiomasModels from "../models/idomas.models.js";

export const getIdiomas = async (req, res) => {
    try {
        const [rows] = await idiomasModels.getIdiomas();

        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontaron idiomas" : "Se encontraron idiomas"
        })
    } catch (error) {
        console.error("Error al obtener los idiomas", error);

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
            console.log("Error, no existe idioma con ese id");

            return res.status(404).json({
                message: `No se encontro idioma con id ${id}`
            });
        }

    } catch (error) {
        console.error("Error al obtener el idioma por Id");

        res.status(500).json({
            message: "Error interno al obtener el idioma por Id"
        });
    }
}