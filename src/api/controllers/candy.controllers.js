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

export const getCandyPorId = async (req, res) => {
    try {
            //Obtenemos el candy por id
            let {id} = req.params; // Esto nos permite obtener el valor numerico despues de peliculas
    
            const [rows] = await candyModels.getCandyPorId(id);
    
            //Comprobamos que existe la pelicula con ese id
            if(rows.length === 0) {
                console.log("Error, no existe candy con ese id");
    
                return res.status(404).json({
                    message: `No se encontro candy con id ${id}`
                });
            }
            
            res.status(200).json({
                payload: rows[0]
            });
        } catch (error) {
            res.status(500).json({
                message: "Error interno al obtener candy con id"
            });
        }
}


export const createCandy = async (req, res) => {

    try {
        let [rows] = await candyModels.insertCandy(req.body);
        res.status(201).json({
            message: `Candy creado con exito`,
            candyId: rows.insertId
        });

    } catch (error) {
        res.status(500).json({
            message: `Error interno al crear el candy`
        });
    }
}

export const modifyCandy = async (req, res) => {
    try {
        //Extraemos el id de la url
        let id = req.id;
        //Extraemos los datos del candy
        let candy = req.body;
        candy = {...candy, id: id}
        let [result] = await candyModels.updateCandy(candy);
        if(result.changedRows === 0){
            return res.status(200).json({
                message: "No se actualizo el candy"
            });
        }

        res.status(202).json({
            message: "Candy modificado con exito"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
}

export const removeCandy = async (req, res) =>{
    
    try {
        let id = req.id;

        let [result] = await candyModels.deleteCandy(id);

        if(result.affectedRows === 0){
            return res.status(400).json({
                message: `No se encontro candy con id: ${id}`
            });
        }

        return res.status(200).json({
            message: `Candy con id ${id} eliminado exitosamente.`
        })
    } catch (error) {

        res.status(500).json({
            message: `Error al eliminar candy con id: ${id}`,
            error: error.message
        })
    }
}