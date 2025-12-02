import peliculaModels from "../models/peliculas.models.js";

const validateId = (req, res, next) => {
    const { id } = req.params;

    // Validamos que el id no sea un numero 
    if(!id || isNaN(Number(id))) {
        return res.status(400).json({
            message: "El id debe ser un numero valido"
        })
    };
    // Convertimos el parametro id a un numero entero 
    req.id = parseInt(id, 10);
    next();
}

const isPreventa = async (req, res, next ) =>{
    try {
        const {id} = req.params;   

        const [rows] = await peliculaModels.getPeliculaPorId(id);
        const pelicula = rows[0];
        const hoy = new Date().toISOString().split("T")[0];
        const fechaEstrenoPelicula = pelicula.fecha_estreno.toISOString().split("T")[0];
        req.esPreventa = parseInt(pelicula.activa) === 0 && fechaEstrenoPelicula > hoy;
        console.log(req.esPreventa);
        
        
        next();

    } catch (error) {
        return res.status(500).json({
            error: "Error interno del servidor"
        })
    }
}


export {
    validateId,
    isPreventa

}

