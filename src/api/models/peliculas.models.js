import connection from "../database/db.js";

//Seleccionamos las peliculas en cartelera
const getPeliculasEnCartelera = () => {
    const sql = `SELECT * FROM peliculas WHERE activa = 1`;
    return connection.query(sql);
}

//Seleccionamos las peliculas en preventa
const getPeliculasEnPreVenta = () => {
     const sql = `SELECT * FROM peliculas WHERE fecha_estreno > CURDATE()`;
     return connection.query(sql);
}

//Seleccionamos pelicula por Id
const getPeliculaPorId = (id) => {
    //Usamos ? por seguridad y evitar inyecciones sql
    const sql = `SELECT * FROM peliculas WHERE id = ?`;
    return connection.query(sql, [id]); // El id reemplaza nuestro ?
}

export default {
    getPeliculasEnCartelera,
    getPeliculasEnPreVenta,
    getPeliculaPorId
}
