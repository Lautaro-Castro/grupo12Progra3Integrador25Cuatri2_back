import connection from "../database/db.js";

const getFuncionesPorIdPelicula = (pelicula_id, preventa, formato_id = null, idioma_id = null, fecha = null, ) => {

        //Armamos la consulta con los joins en las tablas, usamos left join para que si no se encuentra conincidencia complete con null los valores no encontrados.
      
        let sql = `SELECT 

        /*Datos de tabla funciones*/
        F.id, 
        F.sala, 
        F.fecha, 
        F.hora, 
        F.butacas_disponibles,
        F.activa,

        /*Datos de tabla formatos*/
        FO.nombre AS formato, 
        FO.precio AS precio,

        /*Datos Idioma*/
        I.nombre AS idioma

        FROM funciones AS F 
        LEFT JOIN formatos AS FO ON FO.id = F.formato_id 
        LEFT JOIN idiomas AS I ON I.id = F.idioma_id
        WHERE pelicula_id = ? AND F.butacas_disponibles > 0`;

        const values = [pelicula_id];

        //Verificamos que no sea preventa para traer peliculas activas (Ya que si no es preventa y ya no esta activa quiere decir que no esta mas en cartelera). Si es preventa no aplicamos este filtro debido a que la pelicula todavia no esta en cartelera pero lo estara y deberia permitir comprar entradas de futuras funciones.
        if(preventa === false){
            sql+= ` AND F.activa = 1`;
        }else if(preventa === true){
            sql+= ` AND F.activa = 0`;
            console.log("hola")
        }

        //Validamos si la consulta tiene que filtrar por formato o idioma
        if(formato_id){
            sql += ` AND formato_id = ?`;
            values.push(formato_id);
        }
        if(idioma_id){
            sql += ` AND idioma_id = ?`;
            values.push(idioma_id);
        }

        //Agregamos a la consulta la fecha, si se selecciono una fecha especifica se agrega como filtro, sino se traen todas las funciones de hoy en adelante.
        if(fecha){
            sql += ` AND fecha = ?`;
            values.push(fecha);
        }else{
            //Tomamos la fecha con el objeto Date y lo convertimos a string con el metodo toISOString(). Tambien usamos split("T") para separar la fecha de la hora y con el [0] nos quedamos solo con la fecha.
            const fechaHoy = new Date().toISOString().split("T")[0]; 
            sql += ` AND fecha >= ?`;
            values.push(fechaHoy);
        }
        
        return connection.query(sql, values);
}

const getFunciones = (pelicula_id = null, preventa = null, formato_id = null, idioma_id = null, fecha = null) => {

        //Armamos la consulta con los joins en las tablas, usamos left join para que si no se encuentra conincidencia complete con null los valores no encontrados.
        const values = [];
        let sql = `SELECT 

        /*Datos de tabla funciones*/
        F.id, 
        F.sala, 
        F.fecha, 
        F.hora, 
        F.butacas_disponibles,
        F.activa,
        F.pelicula_id, 

        /*Datos de tabla formatos*/
        FO.nombre AS formato, 
        FO.precio AS precio,

        /*Datos Idioma*/
        I.nombre AS idioma,

        /*Nombre Pelicula*/
        P.nombre AS pelicula_nombre

        FROM funciones AS F 
        LEFT JOIN formatos AS FO ON FO.id = F.formato_id 
        LEFT JOIN idiomas AS I ON I.id = F.idioma_id
        LEFT JOIN peliculas AS P ON P.id = F.pelicula_id
        WHERE F.butacas_disponibles > 0`;

        if (pelicula_id){
            sql += ` AND pelicula_id = ?`
            values.push(pelicula_id);

        }

        //Verificamos que no sea preventa para traer peliculas activas (Ya que si no es preventa y ya no esta activa quiere decir que no esta mas en cartelera). Si es preventa no aplicamos este filtro debido a que la pelicula todavia no esta en cartelera pero lo estara y deberia permitir comprar entradas de futuras funciones.
        if(!preventa){
            sql+= ` AND F.activa = 1`;
            console.log("entro a !preventa");
        }else{
            sql+= ` AND F.activa = 0`;
            console.log("entro al else");
        }

        //Validamos si la consulta tiene que filtrar por formato o idioma
        if(formato_id){
            sql += ` AND formato_id = ?`;
            values.push(formato_id);
        }
        if(idioma_id){
            sql += ` AND idioma_id = ?`;
            values.push(idioma_id);
        }

        //Agregamos a la consulta la fecha, si se selecciono una fecha especifica se agrega como filtro, sino se traen todas las funciones de hoy en adelante.
        if(fecha){
            sql += ` AND fecha = ?`;
            values.push(fecha);
        }else{
            //Tomamos la fecha con el objeto Date y lo convertimos a string con el metodo toISOString(). Tambien usamos split("T") para separar la fecha de la hora y con el [0] nos quedamos solo con la fecha.
            const fechaHoy = new Date().toISOString(); 
            sql += ` AND fecha >= ?`;
            values.push(fechaHoy);
        }
        
        return connection.query(sql, values);
}

const getFuncionPorId = (id) =>{

    //Usamos ? por seguridad y evitar inyecciones sql
    const sql = `SELECT * FROM funciones WHERE id = ?`;
    return connection.query(sql, [id]); // El id reemplaza nuestro ?
}

const insertFuncion = (funcion) => {
    let sql = `INSERT INTO funciones (pelicula_id, formato_id, idioma_id, sala, fecha, hora, butacas_disponibles, activa) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [funcion.pelicula_id, funcion.formato_id, funcion.idioma_id, funcion.sala, funcion.fecha, funcion.hora, funcion.butacas_disponibles, funcion.activa]

    return connection.query(sql, values);
}

const updateFuncion = (funcion) => {
    let sql = `UPDATE funciones SET pelicula_id = ?, formato_id = ?, idioma_id = ?, sala = ?, fecha = ?, hora = ?, butacas_disponibles = ?, activa = ? WHERE id = ?`;

    const values = [funcion.pelicula_id, funcion.formato_id, funcion.idioma_id, funcion.sala, funcion.fecha, funcion.hora, funcion.butacas_disponibles, funcion.activa, funcion.id]
    
    return connection.query(sql, values);
}

const updateButacasDisponiblesFuncion = (id, butacas_disponibles) => {
    let sql = `UPDATE funciones SET butacas_disponibles = ? WHERE id = ?`;
    return connection.query(sql, [butacas_disponibles, id]);
}

const deleteFuncion = (id) =>{
    // Baja logica
      let sql = "UPDATE funciones SET activa = 0 WHERE id = ?";
      return connection.query(sql, [id]);
}

export default {
    getFuncionesPorIdPelicula, 
    getFunciones,
    getFuncionPorId,
    insertFuncion,
    updateFuncion,
    updateButacasDisponiblesFuncion,
    deleteFuncion
}