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
        if(!preventa){
            sql+= ` AND F.activa = 1`;
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

        /*Datos de tabla formatos*/
        FO.nombre AS formato, 
        FO.precio AS precio,

        /*Datos Idioma*/
        I.nombre AS idioma

        FROM funciones AS F 
        LEFT JOIN formatos AS FO ON FO.id = F.formato_id 
        LEFT JOIN idiomas AS I ON I.id = F.idioma_id
        WHERE F.butacas_disponibles > 0`;

        if (!pelicula_id){
            sql += ` AND pelicula_id = ?`
            values.push(pelicula_id);

        }

        //Verificamos que no sea preventa para traer peliculas activas (Ya que si no es preventa y ya no esta activa quiere decir que no esta mas en cartelera). Si es preventa no aplicamos este filtro debido a que la pelicula todavia no esta en cartelera pero lo estara y deberia permitir comprar entradas de futuras funciones.
        if(preventa === 0){
            sql+= ` AND F.activa = 1`;
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

export default {
    getFuncionesPorIdPelicula, 
    getFunciones
}