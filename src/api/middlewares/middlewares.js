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
        next();

    } catch (error) {
        return res.status(500).json({
            error: "Error interno del servidor"
        });
    }
}

const validarCamposCandy = async (req, res, next) =>{
    try {
        //Creamos un array con los campos a validar
        const camposCandy = ['nombre', 'descripcion', 'precio', 'imagen_url', 'activo', 'tipo']

        //Usamos filter para ver si alguno de los campos del cnady falta o no  tiene datos en el req.body
        const camposFaltantes = camposCandy.filter(campo => !req.body[campo]);
    
        if(camposFaltantes.length > 0){
            return res.status(400).json({
                    message: "Datos invalidos, asegurate de enviar todos los campos del formulario"
            });
        }
        next();
        
    } catch (error) {
        return res.status(500).json({
            error: "Error interno del servidor"
        });
    }
}

const validarCamposPeliculas = async (req, res, next) =>{
    try {
         //Creamos un array con los campos a validar
        const camposPelicula = ['nombre', 'sinopsis', 'duracion', 'clasificacion', 'fecha_estreno', 'poster_url', 'distribuidor', 'activa'];

        //Usamos filter para ver si alguno de los campos de la pelicula falta o no tiene datos en el req.body
        const camposFaltantes = camposPelicula.filter(campo => !req.body[campo]);
        /*
        Arriba decidimos crear un array y validar si tenia datos o existian mediante un filter porque al ser demasiados campos, realizar destructuring y escribir la validacion manualmente era sucio, difficil de leer y propensa a errores de tipeo.
        */
        if(camposFaltantes.length > 0){
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los campos del formulario"
            });
        }
        next();
        
    } catch (error) {
        return res.status(500).json({
            error: "Error interno del servidor"
        });
    }
    
}

const validarCamposFuncion = async (req, res, next) =>{
    try {
         //Creamos un array con los campos a validar
        const camposFuncion = ['pelicula_id', 'formato_id', 'idioma_id', 'sala', 'fecha', 'hora', 'butacas_disponibles', 'activa'];

        //Usamos filter para ver si alguno de los campos de la funcion falta o no tiene datos en el req.body
        const camposFaltantes = camposFuncion.filter(campo => !req.body[campo]);
        
        if(camposFaltantes.length > 0){
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los campos del formulario"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            error: "Error interno del servidor"
        });
    }
}

export {
    validateId,
    isPreventa,
    validarCamposCandy,
    validarCamposPeliculas,
    validarCamposFuncion
}

